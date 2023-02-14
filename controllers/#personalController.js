const db = require('../models/index')
const User = db.users
const Lesson_for_student = db.lessons_for_students
const Sublesson_for_student = db.sublessons_for_students
const { Op } = require("sequelize");

const getSuccessForDate = async (req, res) => {
    let userId = req.userId
    let date = req.date
    let lessons = await Lesson_for_student.findAll({ attributes: ['lesson_id'] }, { where: { user_id: userId } })
    let avgSuccess = await Sublesson_for_student.findAll(
        {
            attributes: [Sequelize.fn('AVG', Sequelize.col('success')), 'avgSuccess']
        },
        {
            where: { lesson_id: { [Op.in]: lessons }, subLesson_date: date }
        }
    )
    res.send(avgSuccess)
}

const getAlerts = async (req, res) => { }
//create an alerts table???
//and recomendations?????