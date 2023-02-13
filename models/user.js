const { sequelize, DataTypes } = require("./sequelize");
const User = sequelize.define(
    "users",
    {
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email_address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        student_firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        student_lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        birth_date: {
            type: DataTypes.DATE,
        },
        gender: {
            type: DataTypes.STRING,
        },
        id_currentLesson: {
            type: DataTypes.INTEGER,
        },
    },
    {
        timestamps: false,
    }
);
module.exports = User