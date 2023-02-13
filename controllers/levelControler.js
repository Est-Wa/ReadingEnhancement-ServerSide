
const db = require('../models/index')
const Student_level = db.student_level
const Vowelization = db.vowelization

const getLevel = async (req, res) => {
    level = await Student_level.findAll({
        attributes: ['vowelization_id'],
        where: { student_id: req.userId }
    })
    vowels = await Vowelization.find({
        attributes: ['vowelization'],
        where: { vowelization_id: { [Op.in]: level } }
    })
    res.send(vowels)
}

const deleteLevel = async (req, res) => {
    await Student_level.destroy({
        where: {
            student_id: req.userId,
            vowelization_id: req.vowelizationId
        }
    });
};

const addLevel = async (req, res) => {
    let vowel = await Vowelization.findOne({
        attributes: ['vowelization_id'],
        where: { vowelization: req.vowelization }
    });
    await Student_level.create({
        student_id: req.userId,
        vowelization_id: vowel.vowelization_id,
    });
};

