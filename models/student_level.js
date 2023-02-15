const { sequelize, DataTypes } = require("./sequelize");

const Student_level = sequelize.define(
    "student_level",
    {
        student_level_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey:true,
            autoIncrement:true
        },
        vowelization_id: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        student_id: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
    },
    {
        timestamps: false,
        freezeTableName: true
    }
);

module.exports = Student_level;
