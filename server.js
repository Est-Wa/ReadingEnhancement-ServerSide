require('dotenv').config
const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const cron = require('node-cron');
const PORT = process.env.PORT || 3600
const {alertsDailyJob} = require('./utils/SchedulingService')

//middleware
//for static files that is send as a response
app.use('/', express.static(path.join(__dirname,'public')))
app.use(cors())
app.use(express.json())
app.use(cookieParser())

console.log(process.env.NODE_ENV)

//routes
app.use("/api/auth", require("./routes/authRouter"));
app.use("/api/alert", require("./routes/alertRouter"));
app.use("/api/alertForUser", require("./routes/alertForUserRouter"));
app.use("/api/lesson", require("./routes/lessonRouter"));
app.use("/api/level", require("./routes/levelRouter"));
app.use("/api/vowelForLesson", require("./routes/vowelForLessonRouter"));
app.use("/api/vowel", require("./routes/vowelRouter"));
app.use("/api/word", require("./routes/wordRouter"));

cron.schedule('28 19 * * *', alertsDailyJob)

app.listen(PORT, () => console.log(`Server in running on port ${PORT}`))