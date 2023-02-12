module.exports = (sequelize, DataTypes) => {
    const Lesson_for_student = sequelize.define(
        "lesson_for_student",
        {
            lesson_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            student_id: {
                type: DataTypes.INTEGER,
            },
            success: {
                type: DataTypes.INTEGER,
            },
            current_stage: {
                type: DataTypes.INTEGER,
            },
        },
        {
            timestamps: false,
        }
    );
    return Lesson_for_student;
};