const { sequelize, DataTypes } = require("./sequelize");
    const Vowelization_for_lesson = sequelize.define(
        "vowelizations_for_lessons",
        {
            vowelization_for_lesson_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey:true,
                autoIncrement:true
            },
            vowelization_id: {
                type: DataTypes.INTEGER,
                allowNull:false
            },
            lesson_id: {
                type: DataTypes.INTEGER,
                allowNull:false
            },
        },
        {
            timestamps: false,
        }
    );

    module.exports = Vowelization_for_lesson