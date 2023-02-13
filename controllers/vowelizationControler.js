const db = require('../models/index')
const Vowelization_for_lesson = db.vowelizations_for_lessons
const Vowelization = db.vowelization
const { Op } = require("sequelize");

const getVowelsForLesson = async (req, res) => {
    let vowels = await Vowelization_for_lesson.findAll(
        {
            attributes: ['vowelization_id'],
            where: { student_id: req.userId }
        })
    res.send(
        await Vowelization(
            {
                attributes: ['vowelization'],
                where: { vowelization_id: { [Op.in]: vowels } }
            }
        ))
}