const express=require('express')
const { homePage, getLogin, getRegister, register, login, logout, searchUser } = require('../controllers/home')
const { isLoggedin } = require('../middlewares/user')
const router=express.Router()


router
    .route('/')
    .get(isLoggedin,homePage)

router
    .route('/login')
    .get(getLogin)
    .post(login)

router
    .route('/logout')
    .get(logout)

router
    .route('/register')
    .get(getRegister)
    .post(register)

router
    .route('/search')
    // .post(searchUser)    

module.exports=router    