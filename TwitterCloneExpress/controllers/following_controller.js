const res = require('express/lib/response');
const shortid = require('shortid');

const FollowsService = (FollowsRepository) => {
    const controller = {
        // Establishing a following between users.
        createFollowing : async function(req, res) {
            try {
                let follow = await FollowsRepository.followingExistence(req.body.followerId, req.body.followeeId);
                if (follow.length > 0) {
                    throw new Error("Following already estaablished!");
                }

                const newId = shortid.generate();
                const body = {
                    followerId : req.body.followerId,
                    followeeId : req.body.followeeId,
                }
                let newFollowing = await FollowsRepository.insertFollowing(newId, body);
                res.status(200).json({
                    Data : req.body
                });
            } catch (error) {
                ErrorHandling(error, res);
            }
        },
    
        // Deleting a following established between users.
        deleteFollowing : async function(req, res) {
            try {
                console.log(req.query.followerId);
                let deletedFollowing = await FollowsRepository.deleteFollowing(req.query.followerId, req.query.followeeId);
                res.status(200).json({
                    Message : "successfully deleted following with followId: " + req.params.followId 
                })
            } catch (error) {
                ErrorHandling(error, res);
            }
        }, 
    
        // Getting all the established followings between users.
        getFollowings : async function(req, res) {
            try {
                let follows = await FollowsRepository.getAllFollows();
                res.status(200).json({
                    count: follows.length,
                    Data : follows
                });
            } catch (error) {
                res.status(500).json({
                    error : {
                        message : "Internal Server Error!"
                    }
                })
            }
        },
    
        // Getting a particular established following between users.
        getFollowing : async function(req, res) {
            try {
                await FollowsRepository.existenceCheck(req.params.followId);
                let follow = await FollowsRepository.getFollow(req.params.followId);
                res.status(200).json({
                    Data : follow
                });
            } catch (error) {
                ErrorHandling(error, res);
            }
        },

        followingExistence : async function(req, res) {
            try {
                let follow = await FollowsRepository.followingExistence(req.query.followerId, req.query.followeeId);
                res.status(200).send(follow[0])
            } catch (error) {
                ErrorHandling(error, res);
            }
        }
    };

    return controller;
};

function ErrorHandling(error, res){
    const check = "Following is not established!";
    const check2 = "Following already estaablished!";

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
    } else {
        res.status(500).json({
            error : {
                message : "Internal Server Error"
            }
        });
    }
};

module.exports = FollowsService;