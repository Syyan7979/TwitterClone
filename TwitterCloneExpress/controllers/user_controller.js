const res = require('express/lib/response');
const shortid = require('shortid');

const UserService = (UsersRepository) => {
    const controller = {
        // Creating New Users.
        createUser : async function(req, res) {
            try {
                let user = await UsersRepository.usernameExistence(req.body.userName);
                if(user.length > 0) {
                    throw new Error("Username already taken!");
                }

                const newUserId = shortid.generate();
                var body = {
                    userName: req.body.userName,
                    twitterHandle: req.body.twitterHandle,
                    email: req.body.email,
                    password: req.body.password
                }
                let newUser = await UsersRepository.insertUser(newUserId, body);
                res.status(200).json({
                    body : req.body
                });
            } catch (error) {
                ErrorHandling(error, res);
            }
        },
        
        // User update
        patchUser : async function(req, res) {
            try {
                await UsersRepository.existenceCheck(req.params.userId);
                let keys = Object.keys(req.body);
                keys.forEach(async function(key){
                    let updatedParameter = await UsersRepository.updateUser(req.params.userId, key, req.body[key]);
                })
                res.status(200).json({
                    Message : req.body 
                })
            } catch (error) {
                ErrorHandling(error, res);
            }
        },
    
        // Getting all the users
        getUsers : async function(req, res) {
            try {
                let users = await UsersRepository.getAllUsers();
                res.status(200).json({
                    Count : users.length,
                    Data : users
                });
            } catch (error) {
                res.status(500).json({
                    error : {
                        message : error.message
                    }
                })
            }
        },
    
        // Getting an existing user
        getUser : async function(req, res) {
            try {
                await UsersRepository.existenceCheck(req.params.userId);
                let user  = await UsersRepository.getUser(req.params.userId);
                res.status(200).json({
                    Data : user
                });
            } catch (error) {
                ErrorHandling(error, res);
            }
        }, 
    
        // Deleting an existing user
        deleteUser : async function(req, res) {
            try {
                await UsersRepository.existenceCheck(req.params.userId);
                let deletedUser = await UsersRepository.deleteUser(req.params.userId);
                res.status(200).json({
                    Message : "successfully deleted User with userId: " + req.params.userId 
                })
            } catch (error) {
                ErrorHandling(error, res);
            }
        },
    
        // Getting the tweets of a particular user
        getUserTweets : async function(req, res) {
            try {
                await UsersRepository.existenceCheck(req.params.userId);
                let tweets = await UsersRepository.userTweets(req.params.userId);
                res.status(200).json({
                    Count : tweets.length,
                    Data: tweets
                });
            } catch (error) {
                ErrorHandling(error, res);
            }
        },
    
        // Getting the following list of a particular user
        getUserFollowings : async function(req, res) {
            try {
                await UsersRepository.existenceCheck(req.params.userId);
                let followings = await UsersRepository.userFollowings(req.params.userId);
                res.status(200).json({
                    Count : followings.length,
                    Data: followings
                });
            } catch (error) {
                ErrorHandling(error, res);
            }
        },
    
        // Getting the followers list of a particular user
        getUserFollowers : async function(req, res) {
            try {
                await UsersRepository.existenceCheck(req.params.userId);
                let followers = await UsersRepository.userFollowers(req.params.userId);
                res.status(200).json({
                    Count : followers.length,
                    Data: followers
                });
            } catch (error) {
                ErrorHandling(error, res);
            }
        },
    
        // Getting the Feed of a particular user
        getUserFeed : async function(req, res) {
            try {
                await UsersRepository.existenceCheck(req.params.userId);
                let feed = await UsersRepository.userFeed(req.params.userId);
                res.status(200).json({
                    Count : feed.length,
                    Data: feed
                });
            } catch (error) {
                ErrorHandling(error, res);
            }
        },
    
        getUserLikes : async function(req, res) {
            try {
                await UsersRepository.existenceCheck(req.params.userId);
                let likes = await UsersRepository.userLikes(req.params.userId);
                res.status(200).json({
                    Count : likes.length,
                    Data: likes
                });
            } catch (error) {
                ErrorHandling(error, res);
            }
        },
    
        getUserMedias : async function(req, res) {
            try {
                await UsersRepository.existenceCheck(req.params.userId);
                let medias = await UsersRepository.userMedias(req.params.userId);
                res.status(200).json({
                    Count : medias.length,
                    Data: medias
                });
            } catch (error) {
                ErrorHandling(error, res);
            }
        },

        validateUser : async function (req, res) {
            try {
                let user = await UsersRepository.login_validate(req.query.userName, req.query.password);
                res.status(200).json({
                    userId : user.userId
                })
            } catch (error) {
                ErrorHandling(error, res);
            }
        }
    };

    return controller;
};

function ErrorHandling(error, res){
    const check = "User Does not exist!";
    const check2 = "Username already taken!";
    const check3 = 'Invalid username or password';

    if (check.localeCompare(error.message) == 0 || check3.localeCompare(error.message) == 0) {
        res.status(404).json({
            error : {
                message : error.message
            }
        });
    } else if (check2.localeCompare(error.message) == 0) {
        res.status(400).json({
            error: {
                message: error.message
            }
        });
    } else {
        res.status(500).json({
            error : {
                message : "Internal Server Error"
            }
        });
    }
};

module.exports = UserService;