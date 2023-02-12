const dbConfig = require('../config/dbConfig');
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
}
)
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});
const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
//models
db.users = require('./user')(sequelize, DataTypes)
db.words = require('./word')(sequelize, DataTypes)
db.lessons_for_students = require('./lesson_for_student')(sequelize, DataTypes)
db.sublessons_for_students = require('./sublesson_for_student')(sequelize, DataTypes)
db.student_level = require('./student_level')(sequelize, DataTypes)
db.vowelization = require('./vowelization')(sequelize, DataTypes)
db.vowelizations_for_words = require('./vowelization_for_word')(sequelize, DataTypes)
db.vowelizations_for_lessons = require('./vowelization_for_lesson')(sequelize, DataTypes)
db.sequelize.sync({ force: false })
    .then(() => {
        console.log('yes re-sync done!')
    })
module.exports = db