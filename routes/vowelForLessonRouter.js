const express = require('express')
const router = express.Router()
const vowelForLessonController = require("../controllers/vowelForLessonController")

const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT)

router.route('/')
    .post(vowelForLessonController.addVowelForLesson)
    .delete(vowelForLessonController.deleteVowelForLesson)

router.route('/:lessonId')
    .get(vowelForLessonController.getVowelsForLesson)

module.exports = router