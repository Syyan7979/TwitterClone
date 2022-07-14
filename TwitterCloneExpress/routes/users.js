var express = require('express');
var router = express.Router();

const shortid = require('shortid');
const jwt = require('jsonwebtoken');
const db = require('../data_storage/mysql_data_access');
const Redis = require('../cache/redis-cache');
const UsersRepository = require('../repositories/users_repository');
var controller = require('../controllers/user_controller')(new UsersRepository(db, Redis), shortid, jwt);

// Getting all the existing users.
router.get('/all', controller.getUsers)

// Getting an existing particular user
router.get('/:userId', controller.getUser)

// Creating a user
router.post('', controller.createUser)

// Updating a field of a user
router.patch('/:userId', controller.patchUser)

// Deleting an existing particular user.
router.delete('/:userId', controller.deleteUser)


router.get('', controller.getFollowRecommendations, controller.userNameCheck, controller.userEmailCheck);

// Getting the following list of the user.
router.get('/:userId/followings', controller.getUserFollowings)

// Getting the follower list of the user.
router.get('/:userId/followers', controller.getUserFollowers)

router.post('/login', controller.validateUser)

router.get('/likers', controller.getTweetLikers)

module.exports = router;
