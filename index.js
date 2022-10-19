const express=require('express')
const app=express()
require('dotenv').config()
const cookieParser=require('cookie-parser')



const connectDb=require('./config/database')
connectDb()

app.set('view engine','ejs')
app.use(express.static('static'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())

const homeRoute=require('./routes/homeRoute')
const chatRoute=require('./routes/chatRoute')
const { isLoggedin } = require('./middlewares/user')

app.use('/',homeRoute)
app.use('/chat',isLoggedin,chatRoute)


app.listen(7000,'192.168.1.38',()=>{
    console.log('connected on 5000')
})
