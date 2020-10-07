const { getAllCubes }= require('../controllers/cubes')
const { getCube }= require('../controllers/database')


module.exports = (app) => {
    app.get('/',(req,res)=> {
       
        getAllCubes ((cubes) =>{
        res.render('index',{
            title: 'Cube Workshop',
            cubes
      
        })
      })
    })


    app.get('/about',(req,res)=>{
        res.render('about',{title: 'About Cube | Cube Workshop'})
    })
    app.get('/create',(req,res)=>{
        res.render('create',{title: 'Create Cube | Cube Workshop'})
    })



    app.get('/details/:id',(req,res)=>{
        getCube(req.params.id,(cube)=>{

        
        res.render('details',{
            title: 'Cube Details | Cube Workshop',
            ...cube
        
        
        })
      })
    })





    app.get('*',(req,res)=>{
        res.render('404',{title: 'Error | Cube Workshop' })
    })

 };