const { sequelize, DataTypes } = require("./sequelize");

const Vowelization_for_word = sequelize.define(
    "vowelizations_for_words",
    {
        vowelization_for_word_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        vowelization_id: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        word_id: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
    },
    {
        timestamps: false,
    }
);

module.exports = Vowelization_for_word