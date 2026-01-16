const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const UserModel = require('./models/Users')
require('dotenv').config()

const app=express()
app.use(cors()) //accesss node to frontend
app.use(express.json()) //access fonted to backend

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });


app.post('/createUser',async(req,res)=>{
    console.log("Request body:", req.body);
    UserModel.create(req.body)
        .then(user => res.json(user))
        .catch(err => res.status(500).json(err));

})


app.put('/updateuser/:id',(req,res)=>{
    const id=req.params.id;
    UserModel.findByIdAndUpdate({_id:id},{
      name:req.body.name,
      email:req.body.email,
      age:req.body.age})
    .then(u=>res.json(u))
    .catch(err=>res.json(err))
  })
  

app.get('/',(req,res)=>{
    UserModel.find({})
    .then(u=>res.json(u))
    .catch(err=>res.json(err))
  })

  app.get('/getUser/:id',(req,res)=>{
    const id=req.params.id;
    console.log(id)
    UserModel.findById({_id:id})
    .then(u=>res.json(u))
    .catch(err=>res.json(err))
})

app.delete('/delete/:id',(req,res)=>{
    const id=req.params.id;
    UserModel.findByIdAndDelete({_id:id})
    .then(u=>res.json(u))
    .catch(err=>res.json(err))
})

app.listen(3001,()=>{
    console.log("server is running")
})

