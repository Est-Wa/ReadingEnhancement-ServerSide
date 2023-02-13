const { sequelize, DataTypes } = require("./sequelize");

const Word = sequelize.define(
    "words",
    {
        word_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        word: {
            type: DataTypes.STRING,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = Word