const express = require('express')
const app = express()
const ejs = require('ejs')
const path = require('path')
const Data = require('./models/Data')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const fs = require('fs')

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
app.use(methodOverride('_method',{
  methods:['POST','GET']
}))

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

app.get('/post/edit/:id', async (req, res) => {
  const editRout = await Data.findOne({ _id: req.params.id });
  res.render('edit', {
    editRout,
  });
})

app.put('/posts/:id',async(req, res) => {
  console.log('deneme')
  console.log(req.params.id)
  const x = await Data.findOne({_id: req.params.id})
  x.title = req.body.title
  x.detail = req.body.detail
  x.save()

  res.redirect(`/posts/${req.params.id}`)
}); 

app.delete('/post/:id', async(req,res)=>{
  const deletePost = await Data.findOne({_id:req.params.id})
  await Data.findByIdAndRemove(req.params.id)
  res.redirect('/')
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