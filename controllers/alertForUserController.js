const db = require("../models/index")
const { sendingMail } = require('../utils/email')

const Alerts_for_users = db.alerts_for_users
const Users = db.users
const SubLesson_for_student = db.sublessons_for_students


//create
const addAlertForStudent = async (req, res) => {
    const { user_id, alert_id, alert_date } = req.body
    if (!user_id || !alert_id || !alert_date) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    const AlertForUser = { user_id, alert_id, alert_date }
    const createdAlertForUser = await Alerts_for_users.create(AlertForUser)
    if (createdAlertForUser) { // Created 
        return res.status(201).json({ message: `New alert for user ${createdAlertForUser.alert_for_user_id} created` })
    } else {
        return res.status(400).json({ message: 'Invalid data received' })
    }
}

//read

const getAllAlertsForUsers = async (req, res) => {
    const alertsForUsers = await Alerts_for_users.findAll()
    if (alertsForUsers) {
        res.status(200).json(alertsForUsers)
    }
    else {
        res.status(400).json({ message: `no alerts for users found` })
    }
}

const getAlertsForUsersByUserId = async (req, res) => {
    const userId = req.description
    if (!userId) {
        return res.status(400).json({ message: 'A user Id is required' })
    }
    const alertsForUserId = await Alerts_for_users.findAll({ where: { user_id: userId } })
    if (alertsForUserId) {
        res.status(200).json(alertsForUserId)
    }
    else {
        res.status(400).json({ message: `no alerts found for user ${userId} are found` })
    }
}

const getAlertsForUsersByDate = async (req, res) => {
    const date = req.description
    if (!date) {
        return res.status(400).json({ message: 'A date is required' })
    }
    const alertsForDate = await Alerts_for_users.findAll({ where: { alert_date: date } })
    if (alertsForDate) {
        res.status(200).json(alertsForDate)
    }
    else {
        res.status(400).json({ message: `no alerts found for date: ${date} are found` })
    }
}


//האם נצרך?
const getAlertsForUsersId = async (req, res) => {
}
//uptade
//do I need a option for updating or deleting, because once an alert is created successfully why should I need to uptade it or delete it?
//delete




const sendAlert = async (alert, user) => {
    await sendingMail(user.email_address, alert.alert_description, alert.alert)
}

const checkAllAlerts = async (req, res) => {
    const { user } = req.body;
    //how do I use the forgien key aliases?
    let lesson = user.lesson;
    let stage = lesson.stage;
    let countAlert;
    let curSubLesson = await SubLesson_for_student.findOne({ where: { lesson_id: lesson.lesson_id, stage: stage } })
    let prevSubLesson = await SubLesson_for_student.findOne({ where: { lesson_id: lesson.lesson_id, stage: stage - 1 } })
    if (lesson.is_complit && lesson.success >= 8) {
        let alert = await fetch(`http://localhost:3600/api/alert/:${'הגיע הזמן לעבור לשיעור הבא!'}`)
        //add alert to db
        sendAlert(alert, user);
        countAlert++;
    }
    if (lesson.is_complit && lesson.success < 8) {
        let alert = await fetch(`http://localhost:3600/api/alert/:${'נראה כי כדאי לעבור שוב על השיעור שהסתיים עכשיו'}`)
        //add alert to db
        sendAlert(alert, user);
        countAlert++;
    }
    if (prevSubLesson && prevSubLesson.success < 7 && lesson.success > 8) {
        let alert = await fetch(`http://localhost:3600/api/alert/:${'יש לשקול האם הקצב מהיר מדי'}`)
        //add alert to db
        sendAlert(alert, user);
        countAlert++;
    }
    if (curSubLesson.sublesson_date != new Date) {
        let alert = await fetch(`http://localhost:3600/api/alert/:${"עוד לא תרגלנו היום"}`)
        //add alert to db
        sendAlert(alert, user);
        countAlert++;
    }

    res.status(200).json({ message: `${countAlert} alerts where sent to user ${user.user_name}` })
}

module.exports = {
    addAlertForStudent,
    getAllAlertsForUsers,
    getAlertsForUsersByUserId,
    getAlertsForUsersByDate,
    checkAllAlerts
};