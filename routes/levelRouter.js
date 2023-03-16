const express = require('express')
const router = express.Router()
const levelController = require("../controllers/levelController")

router.route('/')
    // .get()
    .post(levelController.addLevel)
    // .put()
    .delete(levelController.deleteLevel)

router.route('/:userId')
    .get(levelController.getLevelForStudent)

module.exports = router