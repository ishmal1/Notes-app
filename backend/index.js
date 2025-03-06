

const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cors = require('cors')
const notesRoute = require('./Routes/noteRoutes')
dotenv.config()

const port = process.env.port

mongoose.connect(process.env.dbUrl)
.then(()=>{
    console.log("database connected")
})
.catch((error)=>{
    console.log(error)
})
app.use(cors())
app.use(express.json())

app.use("/api", notesRoute)

app.listen(port, () => {
    console.log(`server is running at port ${port}`)
})