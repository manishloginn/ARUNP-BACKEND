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
// app.use(cors())
app.use(cookieParser());
app.use(cors({
    // origin:'https://arunp-frontend.vercel.app',
    origin:'http://localhost:3000',
    credentials:true,
}))

app.use(express.json())
app.use(express.urlencoded({extended:true}))





app.use('/', router)








app.listen(PORT, () => {
    console.log(   `running on ${PORT} on ${NODE}`)
})



