const UserService = (UsersRepository, shortid, jwt) => {
    const controller = {
        // Getting all the users
        getUsers : async function(req, res) {
            try {
                let users = await UsersRepository.getAllUsers();
                res.status(200).send(users);
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
                res.status(200).send(user);
            } catch (error) {
                ErrorHandling(error, res);
            }
        },
        
        // Creating New Users.
        createUser : async function(req, res) {
            try {
                const newUserId = shortid.generate();
                var body = { 
                    user_name: req.body.user_name,
                    twitter_handle: req.body.twitter_handle,
                    user_email: req.body.user_email,
                    user_password: req.body.user_password,
                    profile_image : req.body.profile_image,
                    header_image : req.body.header_image
                }
                await UsersRepository.insertUser(newUserId, body);
                let payload = {subject : newUserId};
                let token = jwt.sign(payload, 'Gengwapa7979');
                res.status(200).send({token});
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
                    await UsersRepository.updateUser(req.params.userId, key, req.body[key]);
                })
                res.status(200).json({
                    Message : req.body 
                })
            } catch (error) {
                ErrorHandling(error, res);
            }
        }, 
    
        // Deleting an existing user
        deleteUser : async function(req, res) {
            try {
                await UsersRepository.existenceCheck(req.params.userId);
                await UsersRepository.deleteUser(req.params.userId);
                res.status(200).json({
                    Message : "successfully deleted User with userId: " + req.params.userId 
                })
            } catch (error) {
                ErrorHandling(error, res);
            }
        },

        userNameCheck : async function (req, res, next) {
            if (req.query.userName && !req.query.email) {
                try {
                    let users = await UsersRepository.usernameExistence(req.query.userName);
                    res.status(200).send(users)
                } catch (error) {
                    ErrorHandling(error, res);
                }
            } else next()
        },

        userEmailCheck : async function (req, res, next) {
            if (!req.query.userName && req.query.email) {
                try {
                    let users = await UsersRepository.useremailExistence(req.query.email);
                    res.status(200).send(users)
                } catch (error) {
                    ErrorHandling(error, res);
                }
            } else next()
        },

        // Getting the following list of a particular user
        getUserFollowings : async function(req, res) {
            try {
                await UsersRepository.existenceCheck(req.params.userId);
                let followings = await UsersRepository.userFollowings(req.params.userId);
                res.status(200).send(followings)
            } catch (error) {
                ErrorHandling(error, res);
            }
        },
    
        // Getting the followers list of a particular user
        getUserFollowers : async function(req, res) {
            try {
                await UsersRepository.existenceCheck(req.params.userId);
                let followers = await UsersRepository.userFollowers(req.params.userId);
                res.status(200).send(followers);
            } catch (error) {
                ErrorHandling(error, res);
            }
        },

        validateUser : async function (req, res) {
            try {
                let user = await UsersRepository.login_validate(req.body.user_name, req.body.user_email, req.body.user_password);
                let payload = {subject : user.user_id}
                let token = jwt.sign(payload, "Gengwapa7979")
                res.status(200).send({token});
            } catch (error) {
                ErrorHandling(error, res);
            }
        },

        getFollowRecommendations: async function(req, res, next) {
            if (req.query.userId) {
                try {
                    let users = await UsersRepository.recommendedFollows(req.query.userId);
                    res.status(200).send(users)
                } catch (error) {
                    ErrorHandling(error, res)
                }
            } else next();
        },

        getTweetLikers : async function (req, res) {
            try {
                let users = await UsersRepository.getTweetLikers(req.query.tweetId);
                res.statusCode(200).send(users)
            } catch (error) {
                ErrorHandling(error, res)
            }
        },

        // To do : convert to middleware
        verifytToken: function (req, res, next) {
            if (!req.headers.authorization) {
                return res.status(401).send('Unauthorized request');
            }
            let token = req.headers.authorization.split(' ')[1];
            if (token === 'null') {
                return res.status(401).send('Unauthorized request');
            }
            let payload = jwt.verify(token, 'Gengwapa7979');
            if(!payload) {
                return res.status(401).send('Unauthorized request');
            }
            req.userId = payload.subject;
            next();
        },
    };

    return controller;
};

function ErrorHandling(error, res){
    const check = "User Does not exist!";
    const check2 = "Username already taken!";
    const check3 = 'Invalid username or password';

    if (check.localeCompare(error.message) == 0) {
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
    } else if (check3.localeCompare(error.message) == 0) {
        res.status(401).json({
            message: error.message
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