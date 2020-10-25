const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const {Router}=require('express')
const router=Router()
const jwt=require('jsonwebtoken')
const {getCubeWithAccessories }= require('../controllers/cubes')
const Cube = require('../models/cube')

router.get('/create',(req,res)=>{
 res.render('create',{title: 'Create Cube | Cube Workshop'})
})

router.post('/create',(req,res)=>{
    
  const {
    name,
    description,
    imageUrl,
    difficultyLevel
   }=req.body
    

    const token=req.cookies['aid']
    const decodedObject=jwt.verify(token,config.private_key)
    console.log("Decoded  ",decodedObject)
   

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


router.get('/details/:id',async(req,res)=>{
   const cube=await getCubeWithAccessories(req.params.id)

    
    res.render('details',{
        title: 'Cube Details | Cube Workshop',
        ...cube
    
    
    })
 
})

router.get('/delete',(req,res)=>{
    res.render('deleteCubePage',{title: 'Delete Cube | Cube Workshop'})
})



router.get('/edit',(req,res)=>{
    res.render('editCubePage',{title: 'Edit Cube | Cube Workshop'})
})

module.exports=router