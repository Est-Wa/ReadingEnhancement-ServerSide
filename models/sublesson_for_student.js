module.exports = (sequelize, DataTypes) => {
    const Sublesson_for_student = sequelize.define(
        "sublesson_for_student",
        {
            Sublesson_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            lesson_id: {
                type: DataTypes.INTEGER,
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
    return Sublesson_for_student;
};