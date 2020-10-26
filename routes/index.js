
const {Router}=require('express')
const router=Router()
const { getAllCubes}= require('../controllers/cubes')

const {getUserStatus}=require('../controllers/user')





    router.get('/',getUserStatus,async(req,res)=> {
       const cubes=await  getAllCubes()
       
        res.render('index',{
            title: 'Cube Workshop',
            cubes,
           isLogedIn: req.isLogedIn
        })
      
      
    })


    router.get('/about',getUserStatus,(req,res)=>{
        res.render('about',{
            title: 'About Cube | Cube Workshop',
            isLogedIn:req.isLogedIn
        })
    })
    
    router.get('/logout',(req,res)=>{
        res.clearCookie('aid')

        res.redirect('/')
    })


    router.get('*',(req,res)=>{
        res.render('404',{title: 'Error | Cube Workshop' })
    })


  module.exports = router
