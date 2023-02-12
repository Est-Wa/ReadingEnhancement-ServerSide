module.exports = (sequelize, DataTypes) => {
    const Student_level = sequelize.define(
        "student_level",
        {
            student_level_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            vowelization_id: {
                type: DataTypes.INTEGER,
            },
            user_id: {
                type: DataTypes.INTEGER,
            },
        },
        {
            timestamps: false,
        }
    );
    return Student_level;
};