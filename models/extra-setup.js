const { sequelize } = require("./sequelize");

const applyExtraSetup = () => {
    const { users, words, lessons_for_students,sublessons_for_students,student_level,vowelization,vowelizations_for_words,vowelizations_for_lessons,alerts,alerts_for_users } = sequelize.models;
    users.belongsTo(lessons_for_students , { foreignKey: "id_currentLesson", as: "current_lesson" })
    users.hasMany(student_level, { foreignKey: "student_id", as: "student" })//many to many 3 
    users.hasMany(alerts_for_users, { foreignKey: "student_id", as: "student" })//many to many 1 
    users.hasMany(lessons_for_students, { foreignKey: "student_id", as: "student" })
    lessons_for_students.hasMany(sublessons_for_students, { foreignKey: "lesson_id", as: "lesson" })
    lessons_for_students.hasMany(vowelizations_for_lessons, { foreignKey: "lesson_id", as: "lesson" })//many to many 2
    vowelization.hasMany(student_level, { foreignKey: "vowelization_id", as: "vowelization" })//many to many 3 
    vowelization.hasMany(vowelizations_for_lessons, { foreignKey: "vowelization_id", as: "vowelization" })//many to many 2
    vowelization.hasMany(vowelizations_for_words, { foreignKey: "vowelization_id", as: "vowelization" })//many to many 4 
    alerts.hasMany(alerts_for_users, { foreignKey: "alert_id", as: "alert" })//many to many 1
    words.hasMany(vowelizations_for_words, { foreignKey: "word_id", as: "word" })//many to many 4 
}

module.exports = { applyExtraSetup };