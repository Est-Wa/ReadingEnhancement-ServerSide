const db = require('../models/index')
const Vowelization_for_lesson = db.vowelizations_for_lessons
const Vowelization = db.vowelization
const { Op } = require("sequelize");

//create
const addVowelForLesson = async (req, res) => {
    let{lessonId,vowelization} = req.body;
    if(!lessonId||!vowelization){
        return res.status(400).json({message:`all fields are required`})
    }
    let vowel = await Vowelization.findOne({
        attributes: ['vowelization_id'],
        where: { vowelization: vowelization }
    });
    const created_vowelForLesson = await Vowelization_for_lesson.create({
        lesson_id: lessonId,
        vowelization_id: vowel.vowelization_id,
    });
    if(created_vowelForLesson){
        res.status(200).json({message:`created successfuly`})
    }
    else{
        res.status(400).json({message:`invalied data`})
    }
};

//read
const getVowelsForLesson = async (req, res) => {
    const lessonId = req.lessonId
    if (!lessonId) {
        return res.status(400).json({ message: 'A lesson id is required' })
    }
    level = await Vowelization_for_lesson.findAll({
        attributes: ['vowelization_id'],
        where: { lesson_id: lessonId }
    })
    vowels = await Vowelization.findAll({
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
    deleteVowelForLesson
}