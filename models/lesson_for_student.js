const { sequelize, DataTypes } = require("./sequelize");

const Lesson_for_student = sequelize.define(
    "lessons_for_students",
    {
        lesson_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        student_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        success: {
            type: DataTypes.INTEGER,
        },
        current_stage: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        is_complit:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        }
    },
    {
        timestamps: false,
    }
);

module.exports = Lesson_for_student