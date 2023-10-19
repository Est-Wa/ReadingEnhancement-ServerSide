
const db = require('../models/index')

const Alerts = db.alerts

//create
const addAlert = async (req, res) => {
    const { description, alert } = req.body
    if (!description) {
        return res.status(400).json({ message: 'A description is required' })
    }
    const Alert = { alert_description: description, alert }
    const createdAlert = await Alerts.create(Alert)
    if (createdAlert) { // Created 
        return res.status(201).json({ message: `New alert ${Alert.alert_description} created` })
    } else {
        return res.status(400).json({ message: 'Invalid data received' })
    }
}
//read
const getAllAlerts = async (req, res) => {
    const alerts = await Alerts.findAll()
    if (alerts) {
        res.status(200).json(alerts)
    }
    else {
        res.status(400).json({ message: `no alerts found` })
    }
}
const getAlertByDescription = async (req, res) => {
    const description = req.description
    if (!description) {
        return res.status(400).json({ message: 'A description is required' })
    }
    const singleAlert = await Alerts.findOne({ where: { alert_description: description } })
    if (singleAlert) {
        res.status(200).json(singleAlert)
    }
    else {
        res.status(400).json({ message: `alert ${description} is not found` })
    }
}

const getAlertByDescriptionInternal = async (description) =>{
    if (!description) 
        return null
    const singleAlert = await Alerts.findOne({ where: { alert_description: description } })
    if (singleAlert) 
        return singleAlert
    else return null
}

//האם נצרך?
const getAlertById = async (req, res) => {
}
//update
//doesnt update. why?
const updateAlert = async (req, res) => {
    const { id, description, alert } = req.body
    if (!id) {
        return res.status(400).json({ message: 'An alert id is required' })
    }
    const Alert = { alert_description: description, alert }
    const updatedAlert = await Alerts.update({ Alert }, { where: { alert_id: id } })
    if (updatedAlert) {
        return res.status(201).json({ message: `The alert ${description} has been updated` })
    } else {
        return res.status(400).json({ message: 'Invalid data received' })
    }
}
//delete

module.exports = { addAlert, getAllAlerts, getAlertByDescription, updateAlert,getAlertByDescriptionInternal }