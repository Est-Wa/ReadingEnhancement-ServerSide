const express = require('express')
const router = express.Router()
const wordController = require("../controllers/wordController")

router.route('/')
    .post(wordController.addWord)

module.exports = router