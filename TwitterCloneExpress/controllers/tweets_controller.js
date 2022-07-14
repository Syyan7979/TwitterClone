const TweetsService = (TweetsRepository, shortid) => {
    const controller = {
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

        // Creating a new tweet.
        createTweet : async function(req, res) {
            try {
                const newTweetId = shortid.generate();
                var body = {
                    user_id : req.body.user_id,
                    reply_id : req.body.reply_id,
                    content : req.body.content,
                    media : req.body.media,
                    likes : req.body.likes,
                    user_name : req.body.user_name,
                    twitter_handle : req.body.twitter_handle,
                    profile_image : req.body.profile_image,
                    retweet_id : req.body.retweet_id,
                    retweet_user_id : req.body.retweet_user_id, 
                    retweet_twitter_handle : req.body.retweet_twitter_handle, 
                    quote_tweet_id : req.body.quote_tweet_id, 
                    retweet_quoute_count : req.body.retweet_quoute_count
                };
    
                await TweetsRepository.insertTweet(newTweetId, body);
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

        // Updating an existing tweet.
        updateTweet : async function(req, res) {
            try {
                await TweetsRepository.existenceCheck(req.params.tweetId);
                console.log(req.body)
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
    
        // Deleting an existing tweet.
        deleteTweet : async function(req, res) {
            try {
                await TweetsRepository.existenceCheck(req.params.tweetId);
                await TweetsRepository.deleteTweet(req.params.tweetId);
                res.status(200).json({
                    Message : "successfully deleted Tweet with tweetId: " + req.params.tweetId 
                })
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
                console.log(error);
                ErrorHandling(error, res);
            }
        },

        getUserFeed : async function (req, res) {
            try {
                let tweets  = await TweetsRepository.getUserFeed(req.params.userId);
                res.status(200).send(tweets);
            } catch (error) {
                console.log(error)
                ErrorHandling(error, res);
            }
        },

        getUserTweets : async function (req, res, next) {
            if (!req.query.tweetId) {
                try {
                    let tweets  = await TweetsRepository.getUserTweets(req.query.userId);
                    res.status(200).send(tweets);
                } catch (error) {
                    ErrorHandling(error, res);
                }
            } else next();
        },

        getUserLikes : async function (req, res) {
            try {
                let tweets  = await TweetsRepository.getUserLikes(req.params.userId);
                res.status(200).send(tweets);
            } catch (error) {
                ErrorHandling(error, res);
            }
        },

        getUserMedias : async function (req, res) {
            try {
                let tweets  = await TweetsRepository.getUserMedias(req.params.userId);
                return res.status(200).send(tweets);
            } catch (error) {
                ErrorHandling(error, res);
            }
        },

        uploadPhotos : function (req, res) {
            return new Promise((resolve, reject) => {
                let file_names = new Array();
                if (req.files.length !== 0) {
                    req.files.forEach(file => file_names.push('http://localhost:3000/images/' + file.filename));
                    return resolve(file_names)
                } else {
                    return resolve('null')
                }
            }).then((fileNames) => {return res.status(200).send(fileNames)} 
            ).catch(
                error => res.status(500).send(error.message)
            )
        },

        getRetweetExistence : async function(req, res) {
            try {
                let existence = await TweetsRepository.retweetExistenceCheck(req.query.userId, req.query.tweetId);
                res.status(200).send(existence);
            } catch (error) {
                console.log(error);
                ErrorHandling(error, res);
            }
        },

        deleteRetweet : async function(req, res) {
            try {
                await TweetsRepository.deleteRetweet(req.query.userId, req.query.tweetId);
                res.status(200).json({
                    Message : "successfully deleted like with likeId: " + req.params.followId 
                })
            } catch (error) {
                ErrorHandling(error, res);
            }
        },

        trendingNow : async function(req, res) {
            try {
                let trend = await TweetsRepository.getTrends();
                res.status(200).send(trend);
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
                message : error.message
            }
        });
    }
};


module.exports = TweetsService;