const User=require('../models/User')
const Message=require('../models/Messages')
const cookieToken=require('../utils/cookieToken')
const jwt=require('jsonwebtoken')



exports.homePage=async(req,res)=>{
    const token = req.cookies.token
    const decoded =await jwt.verify(token,process.env.JWT_SECRET)
    let cuser=decoded.username
    let users= await User.find().sort({ "username": 1})
    res.render('home',{users,cuser})
}

exports.getRegister=async(req,res)=>{
    res.render('register')
}

exports.register=async(req,res)=>{
    let {username,password,mobNum}=req.body
    let r_user=await User.findOne({mobNo:mobNum})
    if(!r_user){
        res.send('User Already Exist')
    }
    await User.create({username:username,password:password,mobNo:mobNum})
    res.redirect('/login')

}
exports.getLogin=(req,res)=>{
    res.render('login')
}
exports.login=async(req,res)=>{
    let {username,password}=req.body
    let user=await User.findOne({username:username}).select('+password')
    if(!user){
        return res.redirect('/login')
    }
    let isPasswordCorrect=await user.isValidatedPassword(password)
    if(!isPasswordCorrect){
        return res.redirect('/login')
    }
    cookieToken(user,res)
}
exports.logout = async (req,res)=>{
    res.cookie('token',null,{
        expires: new Date(Date.now()),
        httpOnly:true
    })
    res.status(200).redirect('/')
}
// exports.searchUser=async(req,res)=>{
//     const {filters} = req.body;
//     let users=await User.find()
//     const filteredUsers = users.filter(user => {
//         user.find({})
//       return isValid;
//     });
//     console.log(filteredUsers);
// }
