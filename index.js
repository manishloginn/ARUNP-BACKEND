const express = require('express')
require('dotenv').config()
require('./DB_Connection/dbConnection')
const cors = require('cors')
const router = require('./Routes/route')
const cookieParser = require('cookie-parser');


const app = express()




const PORT = process.env.PORT || 5000
const NODE = process.env.NODE_ENV || 'production'

//middleware
app.use(cookieParser());
app.use(cors({
    origin:['http://localhost:5173' || "https://arunp-frontend.vercel.app/"], 
    credentials:true,
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// app.use(cors())





app.use('/', router)








app.listen(PORT, () => {
    console.log(   `running on ${PORT} on ${NODE}`)
})



