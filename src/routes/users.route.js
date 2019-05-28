const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.route('/')
    .get(userController.index)

router.route('/:id')
    .delete(userController.delete);

router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);

module.exports = router;
