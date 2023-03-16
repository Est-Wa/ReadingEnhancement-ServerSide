const express = require('express')
const router = express.Router()
const lessonController = require("../controllers/lessonController")

router.route('/')
    // .get()
    .post(lessonController.newLesson)
    // .put()
    // .delete()

router.route('/words')
    .get(lessonController.getWords)

router.route('/stage')
    .get(lessonController.getCurrentStage)
    .post(lessonController.newStage)
    // .put()
    // .delete()

router.route('/success/:date')
    .get(lessonController.getSuccessForDate)
router.route('/success')
    .put(lessonController.updateSuccess)

module.exports = router