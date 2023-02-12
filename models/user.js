module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "user",
        {
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            user_name: {
                type: DataTypes.STRING,
            },
            user_lastName: {
                type: DataTypes.STRING,
            },
            user_firstName: {
                type: DataTypes.STRING,
            },
            password: {
                type: DataTypes.STRING,
            },
            email_address: {
                type: DataTypes.STRING,
            },
            student_firstName: {
                type: DataTypes.STRING,
            },
            student_lastName: {
                type: DataTypes.STRING,
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
    return User;
};