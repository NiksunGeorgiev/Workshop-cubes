const {Router}=require('express')

const router=Router()
const bcrypt=require('bcrypt')

const {saveUser,verifyUser,guestAcces,getUserStatus}=require('../controllers/user')
const User = require('../models/user')

router.get('/login',guestAcces,getUserStatus,(req,res)=>{
  
    res.render('loginPage',{
        title: 'Cube Workshop | Login',
        isLogedIn:req.isLogedIn,
        
    })

})

router.post('/login',async (req,res)=>{

    const {error}=await verifyUser(req,res)
  
    if(error){
        res.render('loginPage',{
        title: 'Cube Workshop | Login', 
        error:'Wrong Username or Password'
    })
    } else {
        res.redirect('/')
    }
  })

router.get('/signup',guestAcces,getUserStatus,(req,res)=>{
 
    res.render('registerPage',{
        title: 'Cube Workshop | Register',
        isLogedIn: req.isLogedIn,
      
    })

})

router.post('/signup',async (req,res)=>{
   const{password}=req.body

   if(!password || password.length < 8 || !password.match(/^[A-Za-z0-9]+$/)){
    return res.render('registerPage',{
    title: 'Cube Workshop | Register',
    error:'Username or Password is not valid !'
      })
    }

  const {error}=await saveUser(req,res)

  if(error){
    return res.render('registerPage',{
        title: 'Cube Workshop | Register',
        error:'Username or Password is not valid !'
        })
    }


   res.redirect('/')
  
})






module.exports = router




