var express = require('express');
var router = express.Router();
const LikesRepository = require('../repositories/likes_repository');
var controller = require('../controllers/likes_controller')(LikesRepository);

// Establishing a new following between users
router.post('/', controller.createLikes)

// Getting all established following between users
router.get('/All', controller.getLikes)

// Getting an existing established following between users
router.get('/:likeId', controller.getLike)

// Deleting an existing established following between users
router.delete('/:likeId', controller.deleteLike)

module.exports = router;
