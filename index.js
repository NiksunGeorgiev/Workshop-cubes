require('dotenv').config()
const env = process.env.NODE_ENV || 'development';

const config = require('./config/config')[env];
const express=require('express')
const authRouter = require('./routes/auth')
const indexRouter = require('./routes/index')
const accessoryRouter = require('./routes/accessory')
const cubeRouter = require('./routes/cube')
const app = express()
const mongoose=require('mongoose')



require('./config/express')(app);
app.use('/',cubeRouter)
app.use('/',authRouter)
app.use('/',accessoryRouter)
app.use('/',indexRouter)




mongoose.connect(config.databaseUrl,{ useUnifiedTopology: true,useNewUrlParser: true } , function(err) {
    if(err){
        console.error('Something happen with DataBase')
        throw err
    }

    console.log('DataBase is set up and running...')
})


app.listen(config.port, console.log(`Listening on port ${config.port}! Now its up to you...`));