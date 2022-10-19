require('dotenv').config()
const express=require('express')
const app=express()
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


app.listen(process.env.PORT,()=>{
    console.log('connected on 5000')
})
