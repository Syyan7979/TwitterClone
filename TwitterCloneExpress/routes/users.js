var express = require('express');
var router = express.Router();

const UsersRepository = require('../repositories/users_repository');
var controller = require('../controllers/user_controller')(UsersRepository)

// Creating a user
router.post('/create', controller.createUser)

// Updating a field of a user
router.patch('/update/:userId', controller.patchUser)

// Getting all the existing users.
router.get('/all', controller.getUsers)

// Getting an existing particular user
router.get('/user/:userId', controller.getUser)

// Deleting an existing particular user.
router.delete('/delete/:userId', controller.deleteUser)

// Getting all the tweets of the user.
router.get('/user/:userId/tweets', controller.getUserTweets)

// Getting the following list of the user.
router.get('/user/:userId/followings', controller.getUserFollowings)

// Getting the follower list of the user.
router.get('/user/:userId/followers', controller.getUserFollowers)

// Getting all the tweets of the user.
router.get('/user/:userId/likes', controller.getUserLikes)

// Getting the following list of the user.
router.get('/user/:userId/medias', controller.getUserMedias)

// Getting the feed of the user.
router.get('/user/:userId/feed', controller.getUserFeed)

// validating user login 
router.get('', controller.validateUser);

module.exports = router;
