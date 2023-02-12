module.exports = (sequelize, DataTypes) => {
    const Vowelization_for_lesson = sequelize.define(
        "vowelization_for_lesson",
        {
            vowelization_for_lesson_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            vowelization_id: {
                type: DataTypes.INTEGER,
            },
            lesson_id: {
                type: DataTypes.INTEGER,
            },
        },
        {
            timestamps: false,
        }
    );
    return Vowelization_for_lesson;
};