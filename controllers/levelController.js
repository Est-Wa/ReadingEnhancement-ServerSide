const db = require('../models/index')

const Student_level = db.student_level
const Vowelization = db.vowelization

//read
const getLevelForStudent = async (req, res) => {
    const userId = req.userId
    if (!userId) {
        return res.status(400).json({ message: 'A user id is required' })
    }
    let level = await Student_level.findAll({
        attributes: ['vowelization_id'],
        where: { student_id: userId }
    })
    let vowels = await Vowelization.findAll({
        attributes: ['vowelization'],
        where: { vowelization_id: { [Op.in]: level } }
    })
    if (vowels) {
        res.status(200).json(vowels)
    }
    else {
        res.status(400).json({ message: `level not found for user ${userId}` })
    }
}

//delete
const deleteLevel = async (req, res) => {
    let { studentId, vowelizationId } = req.params;
    if (!studentId || !vowelizationId) {
        return res.status(400).json({ message: `all fields are required` })
    }
    let des = await Student_level.destroy({
        where: {
            student_id: studentId,
            vowelization_id: vowelizationId
        }
    });
    if (des) {
        res.status(200).json({ message: `record deleted successfully` })
    }
    else {
        res.status(400).json({ message: `couldn't delete record` })
    }
};

//create
const addLevel = async (req, res) => {
    let { studentId, vowelization } = req.body;
    if (!studentId || !vowelization) {
        return res.status(400).json({ message: `all fields are required` })
    }
    let vowel = await Vowelization.findOne({
        attributes: ['vowelization_id'],
        where: { vowelization: vowelization }
    });
    const created_student_level = await Student_level.create({
        student_id: studentId,
        vowelization_id: vowel.vowelization_id,
    });
    if (created_student_level) {
        res.status(200).json({ message: `created successfully` })
    }
    else {
        res.status(400).json({ message: `invalid data` })
    }
};

const newLevel = async ( studentId, vowelization) => {
    if (!studentId || !vowelization) {
        return res.status(400).json({ message: `all fields are required` })
    }
    const created_student_level = await Student_level.create({
        student_id: studentId,
        vowelization_id: vowelization,
    });
    if (created_student_level) {
        return true
    }
    else {
        return false
    }
};

module.exports = {
    getLevelForStudent,
    deleteLevel,
    addLevel,
    newLevel
}