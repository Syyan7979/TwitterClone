var express = require('express');
var router = express.Router();
const db = require('../data_storage/mysql_data_access');
const shortid = require('shortid');
const Redis = require('../cache/redis-cache');
var TweetsRepository = require('../repositories/tweets_repository');
var TweetsController = require('../controllers/tweets_controller')(new TweetsRepository(db, Redis), shortid);
var upload = require('../Middlewares/multer-upload')

// Getting all created tweets
router.get('/all', TweetsController.getTweets)

// Getting an existing particular tweet
router.get('/:tweetId', TweetsController.getTweet)

// Creating new tweet
router.post('', TweetsController.createTweet)

// Updating Contents of a tweet
router.patch('/:tweetId', TweetsController.updateTweet)

// Deleting an existing particular tweet
router.delete('/:tweetId', TweetsController.deleteTweet)

router.delete('', TweetsController.deleteRetweet)

// Getting all replies of an existing particular tweet
router.get('/:tweetId/replies', TweetsController.tweetReplies)

// user feed
router.get('/feed/userId=:userId', TweetsController.getUserFeed)

// user tweets
router.get('', TweetsController.getUserTweets, TweetsController.getRetweetExistence)

// user likes
router.get('/likes/userId=:userId', TweetsController.getUserLikes)

// user medias
router.get('/medias/userId=:userId', TweetsController.getUserMedias)

router.post(`/photos`, upload.array('images'), TweetsController.uploadPhotos)

router.get('/trends/route', TweetsController.trendingNow)


module.exports = router;
