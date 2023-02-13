const { sequelize } = require("./sequelize");

const applyExtraSetup = () => {
    const { users, words, lessons_for_students,sublessons_for_students,student_level,vowelization,vowelizations_for_words,vowelizations_for_lessons,alerts,alerts_for_users } = sequelize.models;
    users.belongsTo(lessons_for_students)
    users.hasMany(student_level)
    users.hasMany(alerts_for_users)
    users.hasMany(lessons_for_students)
}

module.exports = { applyExtraSetup };