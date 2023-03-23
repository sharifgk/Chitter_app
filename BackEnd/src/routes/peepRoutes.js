const express = require('express');
const router = express.Router();
const peepController = require('../controllers/peepController.js');

router.post('/', peepController.createPeep);
router.post('/', peepController.getAllPeeps);

module.exports = router;