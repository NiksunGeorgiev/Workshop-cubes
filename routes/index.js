
const {Router}=require('express')

const router=Router()



const { getAllCubes}= require('../controllers/cubes')





    router.get('/',async(req,res)=> {
       const cubes=await  getAllCubes()
       
        res.render('index',{
            title: 'Cube Workshop',
            cubes
        })
      
      
    })


    router.get('/about',(req,res)=>{
        res.render('about',{title: 'About Cube | Cube Workshop'})
    })





    router.get('*',(req,res)=>{
        res.render('404',{title: 'Error | Cube Workshop' })
    })



    module.exports = router
