const {Router}=require('express')

const router=Router()
const bcrypt=require('bcrypt')

const {saveUser,verifyUser,guestAcces,getUserStatus}=require('../controllers/user')
const User = require('../models/user')

router.get('/login',guestAcces,getUserStatus,(req,res)=>{

    res.render('loginPage',{
        title: 'Cube Workshop | Login',
        isLogedIn:req.isLogedIn
    })

})

router.post('/login',async (req,res)=>{

    const status=await verifyUser(req,res)
  
    if(status){
    return  res.redirect('/')
    } else {
        res.redirect('/login')
    }
  })

router.get('/signup',guestAcces,getUserStatus,(req,res)=>{

    res.render('registerPage',{
        title: 'Cube Workshop | Register',
        isLogedIn: req.isLogedIn
    })

})

router.post('/signup',async (req,res)=>{

  const status=await saveUser(req,res)

  if(status){
  return  res.redirect('/')
  }
})






module.exports = router




