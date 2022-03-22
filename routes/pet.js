const express = require("express");
const router = express.Router();
const petsController = require('../controllers/petsController');
const petValidator = require('../validations/petValidator');
const jwtToken = require('../jwtValidation');

router.get('/pet', jwtToken.validateToken, petValidator.id, petsController.getPet);
router.get('/pets', jwtToken.validateToken, petsController.getPets);
router.post('/pet', jwtToken.validateToken, petValidator.add, petsController.postPet);
router.put('/pet', jwtToken.validateToken, petValidator.update, petsController.putPet);
router.delete('/pet', jwtToken.validateToken, petValidator.id, petsController.deletePet);

module.exports = router;