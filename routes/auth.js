const {Router}=require('express')

const router=Router()



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




module.exports = router




