const path=require('path')
const fs  = require('fs')



const dataBaseFile=path.join(__dirname,'..','config/database.json')



const saveCube = (cube,callback) => {
    getCubes((cubes) => {
     
     cubes.push(cube)
 
     fs.writeFile(dataBaseFile, JSON.stringify(cubes), error => {
         if(error){
             throw error
         }
         console.log("Cube is successfully stored")
         callback()
     })

   })
}


    const getCube = (id,callback) =>{
      getCubes(cubes=> {
         const cube= cubes.filter(c => c.id === id)[0]
         callback (cube)
      })
      

    }





    const getCubes = (callback) => {
        fs.readFile(dataBaseFile,(err,dbData) => {
            if(err) {
            throw err
          }
            const cubes=JSON.parse(dbData)
            callback(cubes)
           
        })
    }


   



    module.exports = {
     getCubes, 
     saveCube,
     getCube
    }