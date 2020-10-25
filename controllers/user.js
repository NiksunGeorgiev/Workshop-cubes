const env = process.env.NODE_ENV || 'development';

const config = require('../config/config')[env];

const User=require('../models/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


const generateToken = data =>{
   const token = jwt.sign(data,config.private_key)
   return token
}

const saveUser=async(req,res)=>{

    const{
        username,
        password
   }= req.body
   
    const salt = await bcrypt.genSalt(10)
   
    const hashedPassword=await bcrypt.hash(password,salt)


    const user= new User({
        username,
        password:hashedPassword
    })
   
   
    const userObject=await user.save()
    
    const token=await generateToken({
        userID:userObject._id,
        username:userObject.username
    })

    res.cookie('aid',token)
    
    return true
}


module.exports={
    saveUser,
    generateToken
}