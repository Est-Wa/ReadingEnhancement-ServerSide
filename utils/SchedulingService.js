const db = require('../models/index')
const Users = db.users
const { checkAllAlerts } = require('../controllers/alertForUserController')

const getAllActiveUsers = async () => {
    const activeUsers = await Users.findAll({
        where: { active: true },
    });
    return activeUsers;
};


const alertsDailyJob = async () => {
    try {
        const activeUsers = await getAllActiveUsers();
        for (const user of activeUsers) {
            const countAlert = await checkAllAlerts(user);
            console.log(`Alerts sent to ${user.user_name}: ${countAlert}`);
        }
    } catch (error) {
        console.error('Error running daily job:', error);
    }
}

module.exports = { alertsDailyJob }

