const { sequelize, DataTypes } = require("./sequelize");

const Alerts_for_users = sequelize.define(
    "alerts_for_users",
    {
        alert_for_user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        alert_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        alert_date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        timestamps: false,
    }
);

module.exports = Alerts_for_users