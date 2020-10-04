const Cube=require('../models/cube')

const newCube=new Cube('First','This is first cube','http://google.com',1)

newCube.save()