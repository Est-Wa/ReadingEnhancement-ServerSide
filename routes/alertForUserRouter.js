const express = require('express')
const router = express.Router()
const alertForUserController = require("../controllers/alertForUserController")



router.route('/')
    .get(alertForUserController.getAllAlertsForUsers)
    .post(alertForUserController.addAlertForStudent)
router.route('/:id')
    .get(alertForUserController.getAlertsForUsersByUserId)

module.exports = router