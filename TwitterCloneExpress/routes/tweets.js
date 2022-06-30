var express = require('express');
var router = express.Router();
var TweetsRepository = require('../repositories/tweets_repository');
var TweetsController = require('../controllers/tweets_controller')(TweetsRepository);

// Creating new tweet
router.post('/create', TweetsController.createTweet)

// Updating Contents of a tweet
router.patch('/update/:tweetId', TweetsController.updateTweet)

// Getting all created tweets
router.get('/all', TweetsController.getTweets)

// Getting an existing particular tweet
router.get('/tweet/:tweetId', TweetsController.getTweet)

// Getting all replies of an existing particular tweet
router.get('/tweet/:tweetId/replies', TweetsController.tweetReplies)

// Getting all users that liked a particular tweet
router.get('/tweet/:tweetId/likers', TweetsController.tweetLikers)

// Deleting an existing particular tweet
router.delete('/delete/:tweetId', TweetsController.deleteTweet)

module.exports = router;
