module.exports = (sequelize, DataTypes) => {
    const Vowelization = sequelize.define(
        "vowelization",
        {
            vowelization_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            vowelization: {
                type: DataTypes.STRING,
            },
        },
        {
            timestamps: false,
        }
    );
    return Vowelization;
};