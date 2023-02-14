const db = require('../models/index')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = db.users

const login = async (req, res) => {

    const { user_name, password } = req.body

    if (!user_name || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    const foundUser = await User.findOne({ where: { user_name: user_name } })

    if (!foundUser || !foundUser.active) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    const match = await bcrypt.compare(password, foundUser.password)

    if (!match) return res.status(401).json({ message: 'Unauthorized' })

    //ניצור אובייקט המכיל את הפרטים ללא הסיסמא
    //const userInfo = {password, ...foundUser}
    const userInfo = {
        user_id: foundUser.user_id,
        user_name: foundUser.user_name,
        user_lastName: foundUser.user_lastName,
        user_firstName: foundUser.user_firstName,
        email_address: foundUser.email_address,
        student_firstName: foundUser.student_firstName,
        student_lastName: foundUser.student_lastName,
        birth_date: foundUser.birth_date,
        gender: foundUser.gender,
        id_currentLesson: foundUser.id_currentLesson,
        roles: foundUser.roles
    }

    //Create the token
    const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)
    //res.setHeader('Authorization', `Bearer ${accessToken}`)

    res.json({ accessToken: accessToken })

}

const register = async (req, res) => {
    const { password,
        user_name,
        user_lastName,
        user_firstName,
        email_address,
        student_firstName,
        student_lastName,
        birth_date,
        gender } = req.body

    if (!user_lastName || !user_firstName || !email_address || !student_firstName || !student_lastName || !user_name || !password) {// Confirm data
        return res.status(400).json({ message: 'All fields are required' })
    }

    const duplicate = await User.findOne({ where: { user_name: user_name } })

    if (duplicate) {
        return res.status(409).json({ message: "Duplicate user name" })
    }

    //Hash password
    const hashedPwd = await bcrypt.hash(password, 10)

    const userObject = {
        user_name,
        user_lastName,
        user_firstName,
        email_address,
        student_firstName,
        student_lastName,
        birth_date,
        gender,
        password: hashedPwd
    }
    const user = await User.create(userObject)
    if (user) { // Created 
        return res.status(201).json({ message: `New user ${user.user_name} created` })
    } else {
        return res.status(400).json({ message: 'Invalid user data received' })
    }

}

module.exports = { login, register }
