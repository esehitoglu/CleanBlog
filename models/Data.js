const mongoose = require('mongoose')
const Schema  = mongoose.Schema

// create schema şablon oluşturduk
const GonderiSchema = new Schema({
    title:String,
    detail:String,
    dateCreated:{
        type: Date,
        default:Date.now
    }
})

const Data = mongoose.model('Data',GonderiSchema)

module.exports = Data