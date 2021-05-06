const mongoose = require('mongoose')
const { Schema } = mongoose
const url = require('mongoose-type-url')

// users schema for mongoose
const userSchema = new Schema({
  username: String,
  password: String,
  wishlist: [],
  cart: []
})
// creating a model
const User = mongoose.model('User', userSchema)


// products schema for mongoose
const productSchema = new Schema({
  brand: String,
  name: String,
  price: {
    marked: Number,
    selling: Number
  },
  imgUrl: url,
  size: {uk:[], us:[]},
  color: String,
  type: String,
  gender: String,
  description: String,
  review: Number,
  stock: String
},{timestamps: true})

// creating a model
const Product = mongoose.model('Product', productSchema)

module.exports = {Product, User}