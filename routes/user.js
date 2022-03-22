const express = require("express");
const router = express.Router();
const usersController = require('../controllers/usersController');
const userValidator = require('../validations/UserValidator');
const jwtToken = require('../jwtValidation');

router.get('/user', jwtToken.validateToken, userValidator.id, usersController.getUser);
router.get('/user', jwtToken.validateToken, userValidator.id, usersController.getUser);
router.get('/users', jwtToken.validateToken, usersController.getUsers);
router.post('/login', usersController.getLogin);
router.post('/user', jwtToken.validateToken, userValidator.add, usersController.postUser);
router.put('/user', jwtToken.validateToken, userValidator.update, usersController.putUser);
router.delete('/user', jwtToken.validateToken, userValidator.id, usersController.deleteUser);

module.exports = router;