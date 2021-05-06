const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const URI = 'mongodb+srv://ashish:neoG21@neogcluster.azzgq.mongodb.net/ecomm'

const app = express();
app.use(express.json())
app.use(cors())

// DB Connection
const Client = mongoose.connect(URI,{useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log("Connected")).catch(e=>console.log("Could not connect", e))

// Middleware
app.use((req,res,next)=>{
  // console.log("Middleware called")
  next()
})

app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

// @routes products
const products = require('./products/products.router.js')
app.use('/products', products)

// @routes user
const user = require('./user/user.router.js')
app.use('/user', user)

// @routes wishlist 
const wishlist = require('./wishlist/wishlist.router.js')
app.use('/wishlist', wishlist)

// @routes cart
const cart = require('./cart/cart.router.js')
app.use('/cart', cart)

// Handling ERROR-404 
app.use((req,res)=>{
  res.status(404).json({
    success: false,
    error: "Error - 404 Page not found!!!!"
  })
})

app.listen(3000, () => {
  console.log('server started');
});