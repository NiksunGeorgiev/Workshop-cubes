const {Router}=require('express')

const router=Router()
const bcrypt=require('bcrypt')

const {saveUser}=require('../controllers/user')


const User = require('../models/user')



router.get('/login',(req,res)=>{

    res.render('loginPage',{
        title: 'Cube Workshop | Login'
       
    })

})

router.get('/signup',(req,res)=>{

    res.render('registerPage',{
        title: 'Cube Workshop | Register'
       
    })

})

router.post('/signup',async (req,res)=>{

  const status=await saveUser(req,res)

  if(status){
  return  res.redirect('/')
  }
})






module.exports = router




