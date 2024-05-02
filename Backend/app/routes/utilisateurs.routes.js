const express = require('express');
const router = express.Router();
const utilisateursController = require('../controllers/utilisateurs.controller');

router.post('/', utilisateursController.create);

module.exports = router;