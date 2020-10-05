// TODO: Require Controllers...

module.exports = (app) => {
    app.get('/',(req,res)=>{
        res.render('index',{title: 'Cube Workshop' })
    })
    app.get('/about',(req,res)=>{
        res.render('about',{title: 'About Cube | Cube Workshop'})
    })
    app.get('/create',(req,res)=>{
        res.render('create',{title: 'Create Cube | Cube Workshop'})
    })
    app.get('/details/:id',(req,res)=>{
        res.render('details',{title: 'Cube Details | Cube Workshop'})
    })
    app.get('*',(req,res)=>{
        res.render('404',{title: 'Error | Cube Workshop' })
    })

 };