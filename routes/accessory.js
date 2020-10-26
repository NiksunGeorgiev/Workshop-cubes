const {Router}=require('express')
const router=Router()
const {getAllAccessories} = require('../controllers/accessories')
const {updateCube,getCube}=require('../controllers/cubes')
const {checkAuthentication,getUserStatus,checkAuthenticationJSON} = require('../controllers/user')
const Accessory = require('../models/accessory')


router.get('/create/accessory',checkAuthentication,getUserStatus,(req,res)=>{
    res.render('createAccessory',{
        title: 'Create Accessory | Cube Workshop',
        isLogedIn: req.isLogedIn
    })
})

router.post('/create/accessory',checkAuthenticationJSON,async(req,res)=>{
   const{
       name,
       description,
       imageUrl
   }=req.body
   
   const accessory=new Accessory({name,description,imageUrl})
    
   await accessory.save()

   res.redirect('/create/accessory')
    
})

router.get('/attach/accessory/:id',checkAuthentication,getUserStatus,async(req,res)=>{
     
    
    const cube = await getCube(req.params.id)
    const accessories = await getAllAccessories()

    const cubeAccessories = cube.accessories.map(acc=>acc._id.valueOf().toString())

    const notAttachedAccessories=accessories.filter(acc=>{
     const accessoryString=acc._id.valueOf().toString()
     return !cubeAccessories.includes(accessoryString)
    })
    

    const isFullyAttached = (cube.accessories.length === accessories.length)
    
    res.render('attachAccessory',{
    title: 'Attach Accessory | Cube Workshop',
    ...cube,
    accessories: 
    notAttachedAccessories,
    isFullyAttached,
    isLogedIn:req.isLogedIn
   
  })  
})

router.post('/attach/accessory/:id',checkAuthenticationJSON,async(req,res)=>{

   const{
       accessory
   }=req.body

   await updateCube(req.params.id,accessory)

     res.redirect(`/details/${req.params.id}`)
})  

 
 
 
module.exports = router
