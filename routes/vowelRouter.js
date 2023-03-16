const express = require('express')
const router = express.Router()
const vowelController = require("../controllers/vowelController")

router.route('/')
    .get(vowelController.getAllVowelizations)
    .post(vowelController.addVowel)
    .put(vowelController.updateVowel)
    .delete(vowelController.deleteVowel)

router.route('/:vowelId')
    .get(vowelController.getVowelizationById)

module.exports = router