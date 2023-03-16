const db = require('../models/index')
const Lesson_for_student = db.lessons_for_students
const Sublesson_for_student = db.sublessons_for_students
const Word = db.words
const User = db.users
const Vowelization_for_lesson = db.vowelizations_for_lessons
const Vowelization_for_word = db.vowelizations_for_words
const Student_level = db.student_level
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');


const getWords = async (req, res) => {
    let userId = req.body.userId
    let lessonId = await User.findOne({ attributes: ['id_currentLesson'] }, { where: { user_id: userId } })//id of current lesson
    let requiredVoweles = await Vowelization_for_lesson.findAll({ attributes: ['vowelization_id'] }, { where: { lesson_id: lessonId } })//array of all vowel for this lesson
    requiredVoweles = requiredVoweles.map(obj => obj.vowelization_id)
    let optionalVoweles = await Student_level.findAll({ attributes: ['vowelization_id'] }, { where: { user_id: userId } })
    optionalVoweles = optionalVoweles.map(obj => obj.vowelization_id)

    // let word_codes = await Vowelization_for_word.findAll({ attributes: ['word_id'] }, {
    //     where: {
    //         [Op.and]: [
    //             {
    //                 [Op.or]: [
    //                     { vowelization_id: { [Op.in]: requiredVoweles } }, { vowelization_id: { [Op.in]: optionalVoweles } }
    //                 ]
    //             },
    //             {
    //                 [Op.eq]: [
    //                     sequelize.fn('COUNT', sequelize.col('vowelization_id')), requiredVoweles.unique.length
    //                 ]
    //             }
    //         ]
    //     }
    // }, { group: 'word_id' })
    function countUnique(iterable) {
        return new Set(iterable).size;
    }
    const [word_codes, metadata] =
        await db.query(`select word_id from vowelization_for_word v1
                            where vowelization_id in ${requiredVoweles} or vowelization_id in ${optionalVoweles} and
                            ${countUnique(requiredVoweles)} =  (select count(distinct vowelization_id)
                                                                from vowelization_for_word v2
                                                                where v2.word_id = v1.word_id
                                                                and vowelization_id in ${requiredVoweles})
                            group by word_id`,{type:QueryTypes.SELECT})

    let words = await Word.findAll({ attributes: ['word'] }, { where: { word_id: word_codes } })
    res.send(words)
}

const getCurrentStage = async (req, res) => {
    let userId = req.userId
    let lessonId = await User.findOne({ attributes: ['id_currentLesson'] }, { where: { user_id: userId } })
    let stage = await Lesson_for_student.findOne({ attributes: ['current_stage'] }, { where: { lesson_id: lessonId } })
    res.send(stage)
}

const newLesson = async (req, res) => {
    let userId = req.body.userId
    const created_Lesson = await Lesson_for_student.create({
        student_id: userId,
        current_stage: 1
    })
    if(created_Lesson){
        res.status(200).json({message:`created successfuly`})
    }
    else{
        res.status(400).json({message:`invalied data`})
    }

}

const newStage = async (req, res) => {
    let stage = req.stage
    let lessonId = req.lessonId
    await Sublesson_for_student.create({
        lesson_id: lessonId,
        subLesson_date: new Date,
        stage: stage
    })
}

const updateSuccess = async (req, res) => {
    let curStage = await Lesson_for_student.findOne({ attributes: ['stage'] }, { where: { lesson_id: req.lessonId } })
    await Sublesson_for_student.update(
        {
            success: req.success
        },
        {
            where: {
                lesson_id: req.lessonId,
                stage: curStage
            }
        }
    )
}

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

module.exports = {
    getWords,
    getCurrentStage,
    newLesson,
    newStage,
    updateSuccess,
    getSuccessForDate
}