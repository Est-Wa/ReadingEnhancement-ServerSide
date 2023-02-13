const { sequelize, DataTypes } = require("./sequelize");

const Alerts = sequelize.define(
    "alerts",
    {
        alert_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        alert_description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        alert: {
            type: DataTypes.TEXT,
        },
    },
    {
        timestamps: false,
    }
);

module.exports = Alerts;