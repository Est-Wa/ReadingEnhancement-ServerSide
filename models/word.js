module.exports = (sequelize, DataTypes) => {
    const Word = sequelize.define(
        "word",
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
    return Word;
};