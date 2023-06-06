const db = require('../models/index')
const Vowelization_for_lesson = db.vowelizations_for_lessons
const Vowelization = db.vowelization
const { Op } = require("sequelize");

//✌
//create
const addVowelForLesson = async (req, res) => {
    const { lessonId, vowelization_id } = req.body;
    if (!lessonId || !vowelization_id) {
        return res.status(400).json({ message: `all fields are required` })
    }
    const created_vowelForLesson = await Vowelization_for_lesson.create({
        lesson_id: lessonId,
        vowelization_id: vowelization_id,
    });
    if (created_vowelForLesson) {
        res.status(200).json({ message: `created successfuly` })
    }
    else {
        res.status(400).json({ message: `invalied data` })
    }
};


const newVowelForLesson = async ( lessonId, vowelization_id ) => {
    if (!lessonId || !vowelization_id) {
        return res.status(400).json({ message: `all fields are required` })
    }
    const created_vowelForLesson = await Vowelization_for_lesson.create({
        lesson_id: lessonId,
        vowelization_id: vowelization_id,
    });
    if (created_vowelForLesson) {
        return true ;
    }
    else {
        return false ;
    }
};
//✌
//read
const getVowelsForLesson = async (req, res) => {
    const lessonId = req.params.lessonId
    if (!lessonId) {
        return res.status(400).json({ message: 'A lesson id is required' })
    }
    let level = await Vowelization_for_lesson.findAll({
        attributes: ['vowelization_id'],
        where: { lesson_id: lessonId }
    })
    level = [...level].map(obj => obj.vowelization_id);
    const vowels = await Vowelization.findAll({
        attributes: ['vowelization'],
        where: { vowelization_id: { [Op.in]: level } }
    })
    if (vowels) {
        res.status(200).json(vowels)
    }
    else {
        res.status(400).json({ message: `no vowels found for this lesson` })
    }
}

//update

//delete
const deleteVowelForLesson = async (req, res) => {
    let { lessonId, vowelizationId } = req.params;
    if (!lessonId || !vowelizationId) {
        return res.status(400).json({ message: `all fields are required` })
    }
    let des = await Vowelization_for_lesson.destroy({
        where: {
            lesson_id: lessonId,
            vowelization_id: vowelizationId
        }
    });
    if (des) {
        res.status(200).json({ message: `record deleted successfuly` })
    }
    else {
        res.status(400).json({ message: `couldnt delete record` })
    }
};

module.exports = {
    addVowelForLesson,
    getVowelsForLesson,
    deleteVowelForLesson,
    newVowelForLesson
}