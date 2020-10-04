const {v4}=require('uuid')
const fs=require('fs')
const path=require('path')


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
     const data={
         id : this.id,
         name : this.name,
         description : this.description,
         imgUrl : this.imgUrl,
         difficulty : this.difficulty
    }
    
    fs.readFile(dataBaseFile,(err,dbData) => {
        if(err) {
        throw err
     }
        const db=JSON.parse(dbData)
        db.push(data)
        

        fs.writeFile(dataBaseFile, JSON.stringify(db), error => {
            if(error){
                throw error
            }
            console.log("Cube is successfully stored")
        })
      
    })

 }
}

module.exports = Cube