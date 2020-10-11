const {v4}=require('uuid')
const {saveCube} = require('../controllers/database')




class Cube {
constructor(name,description,imgUrl,difficulty){
    this.id = v4()
    this.name = name || "No Name"
    this.description = description
    this.imgUrl = imgUrl || "placeholder"
    this.difficulty = difficulty || 0
 } 

 save(callback){
     const newCube={
         id : this.id,
         name : this.name,
         description : this.description,
         imgUrl : this.imgUrl,
         difficulty : this.difficulty
    }
    
    saveCube(newCube,callback)
    
  }
}

module.exports = Cube