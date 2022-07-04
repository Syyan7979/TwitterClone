var express = require('express');
var router = express.Router();
const FollowsRepository = require('../repositories/follows_repository');
var controller = require('../controllers/following_controller')(FollowsRepository)

// Establishing a new following between users
router.post('/', controller.createFollowing)

// Getting all established following between users
router.get('/All', controller.getFollowings)

// Getting an existing established following between users
router.get('/:followId', controller.getFollowing)

// Deleting an existing established following between users
router.delete('/', controller.deleteFollowing)

router.get('', controller.followingExistence)

module.exports = router;
