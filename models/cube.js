const {v4}=require('uuid')
const {saveCube} = require('../controllers/database')


const dataBaseFile=path.join(__dirname,'../config/database.json')

class Cube {
constructor(name,description,imgUrl,difficulty){
    this.id = v4()
    this.name = name || "No Name"
    this.description = description
    this.imgUrl = imgUrl || "placeholder"
    this.difficulty = difficulty || 0
 } 

 save(){
     const newCube={
         id : this.id,
         name : this.name,
         description : this.description,
         imgUrl : this.imgUrl,
         difficulty : this.difficulty
    }
    
    saveCube(newCube)
    
  }
}

module.exports = Cube