const db = require("../models/index")
const { sendingMail } = require('../utils/email')
const { getAlertByDescriptionInternal } = require('./alertsController')
const { getCurrentDate } = require('../utils/formatDate')
const Alerts_for_users = db.alerts_for_users
const Users = db.users
const SubLesson_for_student = db.sublessons_for_students
const Lesson_for_student = db.lessons_for_students


//create
const addAlertForStudent = async (req, res) => {
    const { user_id, alert_id } = req.body
    if (!user_id || !alert_id) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    const AlertForUser = { user_id, alert_id, alert_date: getCurrentDate() }
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
    const userId = req.params.id
    if (!userId) {
        return res.status(400).json({ message: 'A user Id is required' })
    }
    const currentDate = getCurrentDate();
    console.log('Current Date:', currentDate);

    const alertsForUserId = await Alerts_for_users.findAll({ where: { user_id: userId, nalert_date: currentDate } });
    console.log('Found Alerts:', alertsForUserId);

    if (alertsForUserId) {
        res.status(200).json(alertsForUserId)
    }
    else {
        res.status(400).json({ message: `no alerts found for user ${userId}` })
    }
}

const getAlertsForUsersByDate = async (req, res) => {
    const date = req.date
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
//update
//do I need a option for updating or deleting, because once an alert is created successfully why should I need to uptade it or delete it?
//delete




const sendAlert = async (alert, user) => {
    console.log('sending an email')
    await sendingMail(user.email_address, alert.alert_description, alert.alert)
}

const checkAllAlerts = async (user) => {
    try {
        const lessonId = user.id_currentLesson;
        const lesson = await Lesson_for_student.findOne({
            where: {
                lesson_id: lessonId,
            },
        })
        // Get the current stage from the Lesson_for_student table
        const currentStage = lesson.current_stage

        if (!currentStage) {
            throw new Error("Lesson stage data not found.");
        }


        // Find the current and previous sublessons
        const curSubLesson = await SubLesson_for_student.findOne({
            where: {
                lesson_id: lessonId,
                stage: currentStage,
            },
        });

        const prevSubLesson = await SubLesson_for_student.findOne({
            where: {
                lesson_id: lessonId,
                stage: currentStage - 1, // Corrected the stage calculation
            },
        });

        let countAlert = 0;

        // Check conditions and send alerts
        if (lesson.is_complete && lesson.success >= 4) {
            const alert = await getAlertByDescriptionInternal('הגיע הזמן לעבור לשיעור הבא!');
            if (alert) {
                const AlertForUser = { user_id: user.user_id, alert_id: alert.alert_id, alert_date: getCurrentDate() };
                await Alerts_for_users.create(AlertForUser);
                sendAlert(alert, user);
                countAlert++;
            }
        }

        if (lesson.is_complete && lesson.success < 4) {
            const alert = await getAlertByDescriptionInternal('נראה כי כדאי לעבור שוב על השיעור שהסתיים עכשיו');
            if (alert) {
                const AlertForUser = { user_id: user.user_id, alert_id: alert.alert_id, alert_date: getCurrentDate() };
                await Alerts_for_users.create(AlertForUser);
                sendAlert(alert, user);
                countAlert++;
            }
        }

        if (prevSubLesson && prevSubLesson.success < 4 && lesson.success > 4) {
            const alert = await getAlertByDescriptionInternal('יש לשקול האם הקצב מהיר מדי');
            if (alert) {
                const AlertForUser = { user_id: user.user_id, alert_id: alert.alert_id, alert_date: getCurrentDate() };
                await Alerts_for_users.create(AlertForUser);
                sendAlert(alert, user);
                countAlert++;
            }
        }

        console.log(curSubLesson)

        console.log(curSubLesson.sublesson_date)
        console.log('--today date---')
        const date = getCurrentDate()
        console.log(date)

        if (curSubLesson && curSubLesson.sublesson_date !== date) {
            const alert = await getAlertByDescriptionInternal("עוד לא תרגלנו היום");
            if (alert) {
                const AlertForUser = { user_id: user.user_id, alert_id: alert.alert_id, alert_date: getCurrentDate() };
                await Alerts_for_users.create(AlertForUser);
                sendAlert(alert, user);
                countAlert++;
            }
        }

        return countAlert;
    } catch (error) {
        console.error("Error in checkAllAlerts function:", error);
        throw error; // Re-throw the error to handle it at a higher level if needed.
    }
};

module.exports = {
    addAlertForStudent,
    getAllAlertsForUsers,
    getAlertsForUsersByUserId,
    getAlertsForUsersByDate,
    checkAllAlerts
};