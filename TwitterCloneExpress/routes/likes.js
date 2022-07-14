var express = require('express');
var router = express.Router();
const db = require('../data_storage/mysql_data_access');
const LikesRepository = require('../repositories/likes_repository');
var controller = require('../controllers/likes_controller')(new LikesRepository(db));

// Establishing a new following between users
router.post('', controller.createLikes)

// Deleting an existing established following between users
router.delete('', controller.deleteLike)

router.get('', controller.getLikeExistence)

module.exports = router;
