const mongoose=require('mongoose')
let messageSchema=new mongoose.Schema({
    id:String,
    sender:String,
    receiver:String,
    message:String
})
module.exports=mongoose.model('Message',messageSchema)
