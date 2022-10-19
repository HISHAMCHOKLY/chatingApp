const User=require('../models/User')
const Message=require('../models/Messages')
const jwt=require('jsonwebtoken')


exports.getChatPage=async(req,res)=>{
    let rMobNum=req.params.mobNum
    const token = req.cookies.token
    const decoded =await jwt.verify(token,process.env.JWT_SECRET)
    req.mobNo=decoded.mobNo
    let cUser= await User.findOne({mobNo:rMobNum})
    let cUserMes=await Message.find({ $or: [  {sender:req.mobNo,receiver:rMobNum},{sender:rMobNum,receiver:req.mobNo} ] })
    res.render('chatingPage',{cUserMes,cUser})
}
exports.getMessages=async(req,res)=>{
    let rMobNum=req.params.mobNum
    const token = req.cookies.token
    const decoded =await jwt.verify(token,process.env.JWT_SECRET)
    req.mobNo=decoded.mobNo
    let cUser= await User.findOne({mobNo:rMobNum})
    let cUserMes=await Message.find({ $or: [  {sender:req.mobNo,receiver:rMobNum},{sender:rMobNum,receiver:req.mobNo} ] })
    res.json({cUserMes,cUser})
}
exports.addChat=async(req,res)=>{
    let rMobNum=req.params.mobNum
    const token = req.cookies.token
    const decoded =await jwt.verify(token,process.env.JWT_SECRET)
    req.mobNo=decoded.mobNo
    let {message}=req.body
    await Message.create({id:Date.now(),sender:req.mobNo,receiver:rMobNum,message:message})
    res.json({success:true})
}

