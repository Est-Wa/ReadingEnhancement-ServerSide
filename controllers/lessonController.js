const db = require('../models/index')
const Lesson_for_student = db.lessons_for_students
const Sublesson_for_student = db.sublessons_for_students
const Word = db.words
const User = db.users
const Vowelization_for_lesson = db.vowelizations_for_lessons
const Student_level = db.student_level
const { Op } = require("sequelize");
const { QueryTypes } = require('sequelize');


// ✌
// not all edge cases work!
//if their is a need for images the user sends in the body withImg = true;
const getWords = async (req, res) => {
    let {userId,withImg} = req.query
    console.log(withImg)
    let lessonId = await User.findOne({ attributes: ['id_currentLesson'] }, { where: { user_id: userId } })//id of current lesson
    console.log(lessonId)
    let requiredVoweles = await Vowelization_for_lesson.findAll({ attributes: ['vowelization_id'] }, { where: { lesson_id: lessonId } })//array of all vowel for this lesson
    requiredVoweles = [...requiredVoweles].map(obj => obj.vowelization_id)
    console.log(requiredVoweles)
    let optionalVoweles = await Student_level.findAll({ attributes: ['vowelization_id'] }, { where: { user_id: userId } })
    optionalVoweles = [...optionalVoweles].map(obj => obj.vowelization_id)
    console.log(optionalVoweles)
    function countUnique(iterable) {
        return new Set(iterable).size;
    }
    let word_codes = [];
    word_codes =
        await db.sequelize.query(`select word_id from vowelizations_for_words v1 where (vowelization_id in (${requiredVoweles}) or vowelization_id in (${optionalVoweles})) and ${countUnique(requiredVoweles)} =  (select count(distinct vowelization_id) from vowelizations_for_words v2 where v2.word_id = v1.word_id and vowelization_id in (${requiredVoweles})) group by word_id`, { type: QueryTypes.SELECT })
    wordCodes = word_codes.map((word) => word.word_id);
    let words = await Word.findAll({ attributes: ['word', 'path'], where: { word_id: { [Op.in]: wordCodes } } })
    if (withImg == 'true') {
        console.log('with image')
        const wordsWithImgs = words.filter(word => word.path != null)
        words = words.filter(word=>word.path == null)
        words = words.map(word => word.word)
        const dataToReturn = { words: words, wordsWithImgs }
        res.send(dataToReturn)
        return
    }
    words = words.map(word => word.word)
    res.send(words)
}

const getCurrentStage = async (req, res) => {
    let userId = req.params.userId
    let lessonId = await User.findOne({ attributes: ['id_currentLesson'] }, { where: { user_id: userId } })
    let stage = await Lesson_for_student.findOne({ attributes: ['current_stage'] }, { where: { lesson_id: lessonId } })
    res.send(stage)
}

//✌
const newLesson = async (req, res) => {
    let userId = req.body.userId
    const created_Lesson = await Lesson_for_student.create({
        student_id: userId,
        current_stage: 1
    })
    if (created_Lesson) {
        res.status(200).json({ message: `created successfuly` })
    }
    else {
        res.status(400).json({ message: `invalied data` })
    }

}

const newStage = async (req, res) => {
    let stage = req.params.stage
    let lessonId = req.lessonId
    await Sublesson_for_student.create({
        lesson_id: lessonId,
        subLesson_date: new Date,
        stage: stage
    })
}

const updateSuccess = async (req, res) => {
    const { userId, success } = req.body
    console.log(`userrrrrrrrrrrrr ${userId}`)
    let lessonId = await User.findOne({ attributes: ['id_currentLesson'] }, { where: { user_id: userId } })//id of current lesson
    console.log(`lesson  id ${lessonId.id_currentLesson}`)
    const curStage = await Lesson_for_student.findOne({ attributes: ['current_stage'] }, { where: { lesson_id: lessonId } })
    console.log(`stage ${curStage}`)
    let update = await Sublesson_for_student.update(
        {
            success: success
        },
        {
            where: {
                lesson_id: lessonId,
                stage: curStage
            }
        }
    )
    if(update){
        res.send('updated')
    }
    else{
        res.send('err')
    }
}

const getSuccessForDate = async (req, res) => {
    let userId = req.body.userId
    let date = req.params.date
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