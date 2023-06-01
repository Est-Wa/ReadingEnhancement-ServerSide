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
    // let {userId,withImg} = req.query
    const { user_id } = req.user;
    console.log(user_id)
    const { withImg } = req.query;
    console.log('---------------------------------')
    console.log('withImg');
    console.log(withImg);
    console.log('---------------------------------')

    
    const user = await User.findOne({
        attributes: ["id_currentLesson"], // Retrieve only the id_currentLesson column
        where: {
            user_id // Filter by user_id
        }
    });
    const lessonId = user.id_currentLesson
    console.log('---------------------------------')

    console.log('lessonId')
    console.log(lessonId)
    console.log('---------------------------------')

    let requiredVoweles = await Vowelization_for_lesson.findAll({ attributes: ['vowelization_id'], where: { lesson_id: lessonId } })//array of all vowel for this lesson
    requiredVoweles = [...requiredVoweles].map(obj => obj.vowelization_id)
    console.log('---------------------------------')

    console.log('requiredVoweles')
    console.log(requiredVoweles)
    console.log('---------------------------------')

    let optionalVoweles = await Student_level.findAll({ attributes: ['vowelization_id'] , where: {student_id: user_id } })
    optionalVoweles = [...optionalVoweles].map(obj => obj.vowelization_id)
    console.log('---------------------------------')

    console.log('optionalVoweles')
    console.log(optionalVoweles)
    console.log('---------------------------------')

    function countUnique(iterable) {
        return new Set(iterable).size;
    }
    let word_codes = [];
    if(optionalVoweles.length != 0){
        word_codes =
        await db.sequelize.query(`select word_id from vowelizations_for_words v1 where (vowelization_id in (${requiredVoweles}) or vowelization_id in (${optionalVoweles})) and ${countUnique(requiredVoweles)} =  (select count(distinct vowelization_id) from vowelizations_for_words v2 where v2.word_id = v1.word_id and vowelization_id in (${requiredVoweles})) group by word_id having count(word_id) = (select count(*) from vowelizations_for_words where word_id = v1.word_id)`, { type: QueryTypes.SELECT })
        //having count(word_id) = (select count(*) from vowelizations_for_words where word_id = v1.word_id)
    }
    else(
    word_codes =
        await db.sequelize.query(`select word_id from vowelizations_for_words v1 where (vowelization_id in (${requiredVoweles}) and ${countUnique(requiredVoweles)} =  (select count(distinct vowelization_id) from vowelizations_for_words v2 where v2.word_id = v1.word_id and vowelization_id in (${requiredVoweles}))) group by word_id`, { type: QueryTypes.SELECT })
    )
    const wordCodes = word_codes.map((word) => word.word_id);
    let words = await Word.findAll({ attributes: ['word', 'path'], where: { word_id: { [Op.in]: wordCodes } } })
    if (withImg == 'true') {
        console.log('with image')
        const wordsWithImgs = words.filter(word => word.path != null)
        words = words.filter(word => word.path == null)
        words = words.map(word => word.word)
        const dataToReturn = { words: words, wordsWithImgs }
        res.send(dataToReturn)
        return
    }
    words = words.map(word => word.word)
    res.send(words)
}

const getCurrentStage = async (req, res) => {
    const { user_id } = req.user;
    const user = await User.findOne({
        attributes: ["id_currentLesson"], // Retrieve only the id_currentLesson column
        where: {
            user_id // Filter by user_id
        }
    });
    const lessonId = user.id_currentLesson
    const stage = await Lesson_for_student.findOne({
        attributes: ['current_stage'],
        where: {
            lesson_id: lessonId
        }
    })
    res.send( stage)
}

//✌
const newLesson = async (req, res) => {
    // let userId = req.body.userId
    const { userId } = req.user;
    const created_Lesson = await Lesson_for_student.create({
        student_id: userId,
        current_stage: 1
    })
    if (created_Lesson) {
        res.status(200).json(created_Lesson)
    }
    else {
        res.status(400).json({ message: `invalied data` })
    }

}
const newLessonForUser = async (userId) => {
    console.log('creating a new lesson for the user')
    const created_Lesson = await Lesson_for_student.create({
        student_id: userId,
        current_stage: 1
    })
    if (created_Lesson) {
        return created_Lesson
    }
    else {
        return null
    }
}

const newStage = async (req, res) => {
    const { stage, lessonId } = req.query;
    const createdStage = await Sublesson_for_student.create({
        lesson_id: lessonId,
        subLesson_date: new Date,
        stage: stage
    })
    if (createdStage) {
        res.status(204).json({ message: `stage created successfully`, data: createdStage })
    }
    else {
        res.status(400).json(`error accrued while creating`)
    }
}

const newStageForUser = async (stage, lesson_id) => {
    const createdStage = await Sublesson_for_student.create({
        lesson_id: lesson_id,
        subLesson_date: new Date,
        stage: stage
    })
    if (createdStage) {
        return createdStage
    }
    else {
        return null;
    }
}

const updateSuccess = async (req, res) => {
    const { success, lessonId, stage } = req.body;
    const { userId } = req.user;
    // console.log(`userrrrrrrrrrrrr ${userId}`)
    // const lessonId = await User.findOne({ attributes: ['id_currentLesson'] }, { where: { user_id: userId } })//id of current lesson
    // console.log(`lesson  id ${lessonId.id_currentLesson}`)
    // const curStage = await Lesson_for_student.findOne({ attributes: ['current_stage'] }, { where: { lesson_id: lessonId } })
    // console.log(`stage ${curStage}`)
    const update = await Sublesson_for_student.update(
        {
            success,
        },
        {
            where: {
                lesson_id: lessonId,
                stage
            }
        }
    )
    if (update) {
        res.send('updated')
    }
    else {
        res.send('err')
    }
}

const getSuccessForDate = async (req, res) => {
    // let userId = req.body.userId
    const { userId } = req.user;
    const date = req.params.date;
    const lessons = await Lesson_for_student.findAll({ attributes: ['lesson_id'] }, { where: { user_id: userId } })
    const avgSuccess = await Sublesson_for_student.findAll(
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
    getSuccessForDate,
    newLessonForUser,
    newStageForUser
}