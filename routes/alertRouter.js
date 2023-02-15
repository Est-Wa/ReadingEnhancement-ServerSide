const express = require('express')
const router = express.Router()
const alertsController = require("../controllers/alertsController")



router.route('/')
    .get(alertsController.getAllAlerts)
    .post(alertsController.addAlert)
    .put(alertsController.updateAlert)
    // .delete(alertsController.deleteAlert)
router.route('/:description')
    .get(alertsController.getAlertByDescription)
module.exports = router