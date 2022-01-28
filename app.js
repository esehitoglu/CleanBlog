const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const Data = require('./models/Data')
const mongoose = require('mongoose')


// Connect Db
const myFunc = () => {
  /*
  const userSchema = mongoose.Schema({
      name: String
  });

  const User = mongoose.model("User", userSchema);

  const userObject = new User({
      name: 'Abhishek'
  });

  userObject.save((err, data) => {
      if (err)
          console.log('Error in saving = ' + err);
      if (data)
          console.log('Saved to DB = ' + data)
  }
  );*/
};


mongoose
    .connect("mongodb://0.0.0.0/cleanblog-test-db")
    .then(myFunc(), err => console.log(`Error = ${err}`));



// template engine
app.set('view engine','ejs')

// middlewares
app.use(express.static('public'))
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// routes

app.get('/', async(req,res)=>{
  const sayfayaYaz = await Data.find({})
  res.render('index',{
    sayfayaYaz:sayfayaYaz
  })
})

app.get('/posts/:id',async(req,res)=>{
  //console.log(req.params.id)
  const postx = await Data.findById(req.params.id)
  res.render('post',{
    postx
  })
})

app.get('/about',(req,res)=>{
  res.render('about')
})
app.get('/add_post',(req,res)=>{
  res.render('add_post')
})
app.get('/post',(req,res)=>{
  res.render('post')
})

app.post('/data',async (req,res)=>{
  await Data.create(req.body)
  res.redirect('/')
})

const port = 3000
app.listen(port,()=>{
  console.log(`Sunucu ${port} portunda başlatıldı`)
})