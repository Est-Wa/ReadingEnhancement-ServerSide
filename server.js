require('dotenv').config
const cookieParser = require('cookie-parser')
const express = require('express')
const app = express()
const path = require('path')
const cors = require('cors')
const PORT = process.env.PORT || 3600



//middleware
//for static files that is send as a response
//app.use('/', express.static(path.join(__dirname,'public')))
app.use(cors())
app.use(express.json())
app.use(cookieParser())

//routes
app.use("/api/auth", require("./routes/authRoutes"));
app.listen(PORT, () => console.log(`Server in running on port ${PORT}`))