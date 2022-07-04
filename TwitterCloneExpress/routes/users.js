var express = require('express');
var router = express.Router();

const UsersRepository = require('../repositories/users_repository');
var controller = require('../controllers/user_controller')(UsersRepository)

// Creating a user
router.post('', controller.createUser)
router.post('/login', controller.validateUser)

// Updating a field of a user
router.patch('/:userId', controller.patchUser)

// Getting all the existing users.
router.get('/all', controller.getUsers)

// Getting an existing particular user
router.get('/:userId', controller.getUser)

// Deleting an existing particular user.
router.delete('/:userId', controller.deleteUser)

// Getting all the tweets of the user.
router.get('/:userId/tweets', controller.getUserTweets)

// Getting the following list of the user.
router.get('/:userId/followings', controller.getUserFollowings)

// Getting the follower list of the user.
router.get('/:userId/followers', controller.getUserFollowers)

// Getting all the tweets of the user.
router.get('/:userId/likes', controller.getUserLikes)

// Getting the following list of the user.
router.get('/:userId/medias', controller.getUserMedias)

// Getting the feed of the user.
router.get('/:userId/feed', controller.verifytToken, controller.getUserFeed)

router.get('', controller.userNameCheck, controller.userEmailCheck);

module.exports = router;
