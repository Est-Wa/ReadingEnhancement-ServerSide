const { sequelize, DataTypes } = require("./sequelize");

const Word = sequelize.define(
    "words",
    {
        word_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey:true,
            autoIncrement:true
        },
        word: {
            type: DataTypes.STRING,
        },
        path:{
            type: DataTypes.STRING
        }
    },
    {
        timestamps: false,
    }
);

module.exports = Word