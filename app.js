const express = require('express')
const app = express()
const ejs = require('ejs')
const Data = require('./models/Data')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
//const fs = require('fs')
const postController = require('./controller/postController')
const pageController = require('./controller/pageController')

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

app.get('/', pageController.getIndexPage)
app.get('/about',pageController.getAboutPage)
app.get('/add_post',pageController.getAddpostPage)
app.get('/post',pageController.getPostPage)

app.post('/data',postController.createPost)
app.get('/posts/:id',postController.getPost)
app.get('/post/edit/:id', postController.getEditPost)
app.put('/posts/:id',postController.updatePost)
app.delete('/post/:id', postController.deletePost)

const port = 3000
app.listen(port,()=>{
  console.log(`Sunucu ${port} portunda başlatıldı`)
})