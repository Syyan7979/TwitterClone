const LikesService = (LikesRepository) => {
    const controller = {
        // Establishing a Like between user and tweet.
        createLikes : async function(req, res) {
            try {
                await LikesRepository.insertLike(req.body.liker_id, req.body.tweet_id);
                res.status(200).json({
                    Data : req.body
                });
            } catch (error) {
                console.log(error)
                ErrorHandling(error, res);
            }
        },
    
        // Deleting a Like established between user and tweet.
        deleteLike : async function(req, res) {
            try {
                await LikesRepository.deleteLike(req.query.userId, req.query.tweetId);
                res.status(200).json({
                    Message : "successfully deleted like with likeId: " + req.params.followId 
                })
            } catch (error) {
                ErrorHandling(error, res);
            }
        },

        getLikeExistence : async function(req, res) {
            try {
                let existence = await LikesRepository.likesExistenceCheck(req.query.userId, req.query.tweetId);
                res.status(200).send(existence);
            } catch (error) {
                console.log(error);
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