const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const {Router}=require('express')
const router=Router()
const {checkAuthentication,getUserStatus,checkAuthenticationJSON} = require('../controllers/user')
const jwt=require('jsonwebtoken')
const {getCubeWithAccessories,deleteCube,getCube }= require('../controllers/cubes')
const Cube = require('../models/cube');
const cube = require('../models/cube');

router.get('/create',checkAuthentication,getUserStatus,(req,res)=>{
 res.render('create',{
     title: 'Create Cube | Cube Workshop',
     isLogedIn:req.isLogedIn
    })
})

router.post('/create',checkAuthenticationJSON,(req,res)=>{
    
  const {
    name,
    description,
    imageUrl,
    difficultyLevel
   }=req.body
    

    const token=req.cookies['aid']
    const decodedObject=jwt.verify(token,config.private_key)
    
    const cube=new Cube({name,description,imageUrl,difficulty:difficultyLevel,creatorId:decodedObject.userID})
    cube.save((err)=>{
        if(err){
           console.error(err)
           res.redirect('/create')
        } else {
        res.redirect('/')
        }
    })
})

router.post('/delete/',async(req,res)=>{  
       await Cube.deleteOne()
       res.redirect('/')   
})


router.get('/details/:id',getUserStatus,async(req,res)=>{
   const cube=await getCubeWithAccessories(req.params.id)

    
    res.render('details',{
        title: 'Cube Details | Cube Workshop',
        ...cube,
        isLogedIn:req.isLogedIn
    })
 
})

router.get('/delete/',checkAuthentication,getUserStatus,async(req,res)=>{
    
    res.render('deleteCubePage',{
        title: 'Delete Cube | Cube Workshop', 
        isLogedIn:req.isLogedIn
    })
})



router.get('/edit',checkAuthentication,getUserStatus,(req,res)=>{
    res.render('editCubePage',{
        title: 'Edit Cube | Cube Workshop', 
        isLogedIn:req.isLogedIn
    })
})



module.exports=router