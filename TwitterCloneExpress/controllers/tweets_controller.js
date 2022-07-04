const res = require('express/lib/response');
const shortid = require('shortid');

const TweetsService = (TweetsRepository) => {
    const controller = {
        // Creating a new tweet.
        createTweet : async function(req, res) {
            try {
                const newTweetId = shortid.generate();
                var body = {
                    userId : req.body.userId,
                    replyId : req.body.replyId,
                    content : req.body.content,
                    media : req.body.media,
                    likes : req.body.likes
                };
    
                let newTweet = await TweetsRepository.insertTweet(newTweetId, body);
                res.status(200).json({
                    body : req.body
                });
            } catch (error) {
                console.log(error)
                res.status(500).json({
                    error : {
                        message : "Internal Server Error"
                    }
                });
            }
        },
    
        // Deleting an existing tweet.
        deleteTweet : async function(req, res) {
            try {
                await TweetsRepository.existenceCheck(req.params.tweetId);
                let deletedTweet = await TweetsRepository.deleteTweet(req.params.tweetId);
                res.status(200).json({
                    Message : "successfully deleted Tweet with tweetId: " + req.params.tweetId 
                })
            } catch (error) {
                ErrorHandling(error, res);
            }
        }, 
    
        // Updating an existing tweet.
        updateTweet : async function(req, res) {
            try {
                await TweetsRepository.existenceCheck(req.params.tweetId);
                let keys = Object.keys(req.body);
                keys.forEach(async function(key){
                    let updatedParameter = await TweetsRepository.updateTweet(req.params.tweetId, key, req.body[key]);
                })
                res.status(200).json({
                    Message : req.body 
                })
            } catch (error) {
                ErrorHandling(error, res);
            }
        },
    
        // Getting all existing tweets.
        getTweets : async function(req, res) {
            try {
                let tweets = await TweetsRepository.getAllTweets();
                res.status(200).send(tweets);
            } catch (error) {
                res.status(500).json({
                    error : {
                        message : error.message
                    }
                })
            }
        },
    
        // Getting an existing tweet.
        getTweet : async function(req, res) {
            try {
                await TweetsRepository.existenceCheck(req.params.tweetId);
                let tweet  = await TweetsRepository.getTweet(req.params.tweetId);
                res.status(200).send(tweet);
            } catch (error) {
                ErrorHandling(error, res);
            }
        },
    
        tweetReplies : async function(req, res) {
            try {
                await TweetsRepository.existenceCheck(req.params.tweetId);
                let replies  = await TweetsRepository.tweetReplies(req.params.tweetId);
                res.status(200).send(replies);
            } catch (error) {
                ErrorHandling(error, res);
            }
        },

        tweetLikers : async function(req, res) {
            try {
                await TweetsRepository.existenceCheck(req.params.tweetId);
                let likers  = await TweetsRepository.tweetLikers(req.params.tweetId);
                res.status(200).send(likers);
            } catch (error) {
                ErrorHandling(error, res);
            }
        }
    };

    return controller;
};

function ErrorHandling(error, res){
    const check = "Tweet Does not exist";

    if (check.localeCompare(error.message) == 0) {
        res.status(404).json({
            error : {
                message : error.message
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


module.exports = TweetsService;