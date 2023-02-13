const { sequelize, DataTypes } = require("./sequelize");
    const Sublesson_for_student = sequelize.define(
        "sublessons_for_students",
        {
            Sublesson_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey:true,
                autoIncrement:true,
            },
            lesson_id: {
                type: DataTypes.INTEGER,
                allowNull:false
            },
            success: {
                type: DataTypes.INTEGER,
            },
            sublesson_date: {
                type: DataTypes.DATE,
            },
            stage:{
                type:DataTypes.INTEGER
            }
        },
        {
            timestamps: false,
        }
    );
 
    module.exports = Sublesson_for_student