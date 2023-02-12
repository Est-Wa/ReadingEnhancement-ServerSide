module.exports = (sequelize, DataTypes) => {
    const Vowelization_for_word = sequelize.define(
        "vowelization_for_word",
        {
            vowelization_for_word_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            vowelization_id: {
                type: DataTypes.INTEGER,
            },
            word_id: {
                type: DataTypes.INTEGER,
            },
        },
        {
            timestamps: false,
        }
    );
    return Vowelization_for_word;
};