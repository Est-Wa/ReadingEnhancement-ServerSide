const { sequelize } = require("./sequelize");
const { Op } = require("sequelize");

const applyExtraSetup = () => {
  const { users, words, lessons_for_students, sublessons_for_students, student_level, vowelizations, vowelizations_for_words, vowelizations_for_lessons, alerts, alerts_for_users } = sequelize.models;
  users.belongsTo(lessons_for_students, { foreignKey: "id_currentLesson",as:'lesson'})
  users.hasMany(student_level, { foreignKey: "student_id",as:'student'})//many to many 3 
  users.hasMany(alerts_for_users, { foreignKey: "user_id",as:'user'})//many to many 1 
  users.hasMany(lessons_for_students, { foreignKey: "student_id",as:'userLesson'})
  lessons_for_students.hasMany(sublessons_for_students, { foreignKey: "lesson_id"})
  lessons_for_students.hasMany(vowelizations_for_lessons, { foreignKey: "lesson_id"})//many to many 2
  vowelizations.hasMany(student_level, { foreignKey: "vowelization_id", as: "vowelizations" })//many to many 3 
  vowelizations.hasMany(vowelizations_for_lessons, { foreignKey: "vowelization_id", as: "vowelization_word" })//many to many 2
  vowelizations.hasMany(vowelizations_for_words, { foreignKey: "vowelization_id", as: "vowelization_less" })//many to many 4 
  alerts.hasMany(alerts_for_users, { foreignKey: "alert_id"})//many to many 1
  words.hasMany(vowelizations_for_words, { foreignKey: "word_id" })//many to many 4 


//many to many 2
// lessons_for_students.belongsToMany(vowelization, { through: 'vowelizations_for_lessons',foreignKey: "lesson_id"});
// vowelization.belongsToMany(lessons_for_students, { through: 'vowelizations_for_lessons' ,foreignKey: "vowelization_id"});
//many to many 3
// users.belongsToMany(vowelization,{through:'student_level',foreignKey: "student_id"})
// vowelization.belongsToMany(users,{through:'student_level',foreignKey: "vowelization_id"})
//many to  many 4
// words.belongsToMany(vowelization,{through:'vowelizations_for_words',foreignKey: "word_id"})
// vowelization.belongsToMany(words,{through:'vowelizations_for_words', foreignKey: "vowelization_id"})

}

module.exports = { applyExtraSetup };