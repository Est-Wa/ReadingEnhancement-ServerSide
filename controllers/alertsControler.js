const db = require('../models/index')

const Alerts = db.alerts

//create
const addAlert = async (req, res) => {

}
//read
const getAllAlerts = async (req, res) => {
    alerts = await Alerts.findAll()
    res.send(alerts)
}
const getAlertByDescription = async (req, res) => {
    singleAlert = await Alerts.findOne({ where: { alert_description: req.description } })
    res.send(singleAlert)
}
//update
const updateAlert = async (req, res) => {
    await Alerts.update({ alert_description: req.description, alert: req.alert }, { where: { alert_id: req.alert_id } })
}
//delete