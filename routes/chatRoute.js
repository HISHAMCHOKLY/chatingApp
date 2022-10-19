const express=require('express')
const { getChatPage, addChat, getMessages } = require('../controllers/chat')
const router=express.Router()



router
    .route('/:mobNum')
    .get(getChatPage)
    .post(addChat)

router
    .route('/:mobNum/messages')
    .get(getMessages)    

module.exports=router    
