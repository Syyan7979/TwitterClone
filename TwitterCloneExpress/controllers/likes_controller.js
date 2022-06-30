const res = require('express/lib/response');
const shortid = require('shortid');

const LikesService = (LikesRepository) => {
    const controller = {
        // Establishing a Like between user and tweet.
        createLikes : async function(req, res) {
            try {
                let like = await LikesRepository.likesExistence(req.body.userId, req.body.tweetId);
                if (like.length > 0) {
                    throw new Error("Like already estaablished!");
                }
                const newId = shortid.generate();
                const body = {
                    userId : req.body.userId,
                    tweetId : req.body.tweetId,
                }
                let newLike = await LikesRepository.insertLike(newId, body);
                res.status(200).json({
                    Data : req.body
                });
            } catch (error) {
                ErrorHandling(error, res);
            }
        },
    
        // Deleting a Like established between user and tweet.
        deleteLike : async function(req, res) {
            try {
                await LikesRepository.existenceCheck(req.params.likeId);
                let deletedLike = await LikesRepository.deleteLike(req.params.likeId);
                res.status(200).json({
                    Message : "successfully deleted like with likeId: " + req.params.followId 
                })
            } catch (error) {
                ErrorHandling(error, res);
            }
        }, 
    
        // Getting all the established followings between users.
        getLikes : async function(req, res) {
            try {
                let likes = await LikesRepository.getAllLikes();
                res.status(200).json({
                    count: likes.length,
                    Data : likes
                });
            } catch (error) {
                ErrorHandling(error, res);
            }
        },
    
        // Getting a particular established following between users.
        getLike : async function(req, res) {
            try {
                await LikesRepository.existenceCheck(req.params.likeId);
                let like  = await LikesRepository.getLike(req.params.likeId);
                res.status(200).json({
                    Data : like
                });
            } catch (error) {
                ErrorHandling(error, res);
            }
        }
    };
    return controller;
};

function ErrorHandling(error, res){
    const check = "Like is not established!";
    const check2 = "Like already estaablished!";

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
module.exports = LikesService;