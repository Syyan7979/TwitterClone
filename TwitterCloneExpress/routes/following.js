var express = require('express');
var router = express.Router();
const db = require('../data_storage/mysql_data_access');
const Redis = require('../cache/redis-cache');
const FollowsRepository = require('../repositories/follows_repository');
var controller = require('../controllers/following_controller')(new FollowsRepository(db, Redis))

// Getting all established following between users
router.get('/all', controller.getFollowings)

// Getting an existing established following between users
router.get('/:followId', controller.getFollowing)

// Establishing a new following between users
router.post('', controller.createFollowing)

// Deleting an existing established following between users
router.delete('', controller.deleteFollowing)

router.get('', controller.followingExistence)

module.exports = router;
