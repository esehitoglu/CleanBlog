const express = require('express')
const ejs = require('ejs')
const app = express()
const path = require('path')

// template engine
app.set('view engine','ejs')

// middlewares
app.use(express.static('public'))

// routes
app.get('/',(req,res)=>{
  res.render('index')
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

const port = 3000
app.listen(port,()=>{
  console.log(`Sunucu ${port} portunda başlatıldı`)
})