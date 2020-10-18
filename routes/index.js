const { getAllCubes,getCube }= require('../controllers/cubes')

const Cube = require('../models/cube')


module.exports = (app) => {
    app.get('/',async(req,res)=> {
       const cubes=await  getAllCubes()
       
        res.render('index',{
            title: 'Cube Workshop',
            cubes
        })
      
      
    })


    app.get('/about',(req,res)=>{
        res.render('about',{title: 'About Cube | Cube Workshop'})
    })


    app.get('/create',(req,res)=>{
        res.render('create',{title: 'Create Cube | Cube Workshop'})
    })

    app.post('/create',(req,res)=>{
        
      const {

        name,
        description,
        imageUrl,
        difficultyLevel

       }=req.body

       const cube=new Cube({name,description,imageUrl,difficulty:difficultyLevel})
       cube.save(()=>{
           res.redirect('/')
       })
    })
    app.get('/create/accessory',(req,res)=>{
        res.render('createAccessory',{title: 'Create Accessory | Cube Workshop'})
    })



    app.get('/details/:id',async(req,res)=>{
       const cube=await getCube(req.params.id)

        
        res.render('details',{
            title: 'Cube Details | Cube Workshop',
            ...cube
        
        
        })
     
    })





    app.get('*',(req,res)=>{
        res.render('404',{title: 'Error | Cube Workshop' })
    })

 };