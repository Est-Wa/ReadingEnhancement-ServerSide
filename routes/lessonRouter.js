const express = require('express')
const router = express.Router()
const lessonController = require("../controllers/lessonController")
const verifyJWT = require ('../middleware/verifyJWT');

router.route('/')
    // .get()
    .post(verifyJWT,lessonController.newLesson)
    // .put()
    // .delete()

router.route('/words')
    .get(verifyJWT,lessonController.getWords)

router.route('/stage')
    .get(verifyJWT,lessonController.getCurrentStage)
    .post(verifyJWT,lessonController.newStage)
    // .put()
    // .delete()

router.route('/success/:date')
    .get(verifyJWT,lessonController.getSuccessForDate)
router.route('/success')
    .put(verifyJWT,lessonController.updateSuccess)

module.exports = router