const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const User=require('../models/user')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');



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

const verifyUser = async(req,res) =>{
    const{
        username,
        password
    }= req.body

    const user = await User.findOne({username})
   
    const status =await bcrypt.compare(password,user.password)
    
    if(status){
        const token=await generateToken({
            userID:user._id,
            username:user.username
        })

        res.cookie('aid',token)
    }

    return status

}


const checkAuthentication = (req,res,next) =>{
    
    try{
     const token =req.cookies['aid']
     jwt.verify(token,config.private_key)
     next()
    }catch(e){ 
     return res.redirect('/')  
    }
}

const guestAcces = (req,res,next) =>{
    const token =req.cookies['aid']
  
    if(token){
      
      return res.redirect('/')
    }
    next()

}

const getUserStatus=(req,res,next)=>{
    try{
       const token =req.cookies['aid']
       jwt.verify(token,config.private_key)
       req.isLogedIn=true
    }catch(e){ 
        req.isLogedIn=false
    }

    next()
}


const checkAuthenticationJSON = (req,res,next) =>{
    
    try{
     const token =req.cookies['aid']
     jwt.verify(token,config.private_key)
     next()
    }catch(e){ 
     return res.json({eroor:"Not Authenticated"})
    }
}


module.exports={
    saveUser,
    verifyUser,
    checkAuthentication,
    guestAcces,
    getUserStatus,
    checkAuthenticationJSON
}