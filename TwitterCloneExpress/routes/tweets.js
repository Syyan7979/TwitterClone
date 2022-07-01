var express = require('express');
var router = express.Router();
var TweetsRepository = require('../repositories/tweets_repository');
var TweetsController = require('../controllers/tweets_controller')(TweetsRepository);

// Creating new tweet
router.post('/', TweetsController.createTweet)

// Updating Contents of a tweet
router.patch('/:tweetId', TweetsController.updateTweet)

// Getting all created tweets
router.get('/all', TweetsController.getTweets)

// Getting an existing particular tweet
router.get('/:tweetId', TweetsController.getTweet)

// Getting all replies of an existing particular tweet
router.get('/:tweetId/replies', TweetsController.tweetReplies)

// Getting all users that liked a particular tweet
router.get('/:tweetId/likers', TweetsController.tweetLikers)

// Deleting an existing particular tweet
router.delete('/:tweetId', TweetsController.deleteTweet)

module.exports = router;
