const { Sequelize } = require('sequelize');
const {sequelize} = require('./sequelize');
const { applyExtraSetup } = require('./extra-setup');

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

//models
db.users = require('./user')
db.words = require('./word')
db.lessons_for_students = require('./lesson_for_student')
db.sublessons_for_students = require('./sublesson_for_student')
db.student_level = require('./student_level')
db.vowelization = require('./vowelization')
db.vowelizations_for_words = require('./vowelization_for_word')
db.vowelizations_for_lessons = require('./vowelization_for_lesson')
db.alerts = require('./alerts')
db.alerts_for_users = require('./alerts_for_users')

applyExtraSetup();

db.sequelize.sync({ alter: true })
    .then(() => {
        console.log('yes re-sync done!')
    })
module.exports = db