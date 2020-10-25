const {Router}=require('express')

const router=Router()

const {getAllAccessories} = require('../controllers/accessories')
const {updateCube,getCube}=require('../controllers/cubes')

const Accessory = require('../models/accessory')


router.get('/create/accessory',(req,res)=>{
    res.render('createAccessory',{title: 'Create Accessory | Cube Workshop'})
})

router.post('/create/accessory',async(req,res)=>{
   const{
       name,
       description,
       imageUrl
   }=req.body
   
   const accessory=new Accessory({name,description,imageUrl})
    
   await accessory.save()

   res.redirect('/create/accessory')
    
})

router.get('/attach/accessory/:id',async(req,res)=>{
     
    
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
   
})  
})

router.post('/attach/accessory/:id',async(req,res)=>{

   const{
       accessory
   }=req.body

   await updateCube(req.params.id,accessory)

     res.redirect(`/details/${req.params.id}`)
 })  

 module.exports = router
