const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { User, Product } = require('../models/models.js')

router.route('/')
  .get(async (req,res)=>{
    try{
      const { cart } = await User.findById("60806b3d1da82403653f343c")
      const products = await Product.find()
      let cartProducts = products.map(product=>{
        if(cart.filter(item=> item.productId === product._id.toString()).length !== 0){
          let  tempProduct = cart.find(item=> item.productId === product._id.toString()).qty 
          return { ...product._doc, qty: tempProduct }
        }
      })
      const cartItems = cartProducts.filter(item => item !== undefined)
      res.json({ 
        success: true,
        status: 200,
        cart: cartItems
      }) 
    }catch(e){
      res.status(404).json({
        success: false,
        status: 404,
        error: e.message,
        result: 'Cart not found'
      })
    }
  })
  .post(async (req,res)=>{
    const { newCartItemId } = req.body
    try{
      const result = await User.findOneAndUpdate({ _id: "60806b3d1da82403653f343c" }, { $push: { cart: { productId: newCartItemId, qty: 1 } } })
      res.json({
        success: true,
        status: 200,
        result: 'New product added to the cart'
      })
    }catch(e){
      res.status(404).json({
        success: false,
        status: 404,
        error: e.message,
        result: 'Cart not updated'
      })
    }
  })

router.route('/update')
  .post(async (req,res)=>{
    const { productId, operation } = req.body
    try{
      const { cart } = await User.findById({_id: "60806b3d1da82403653f343c"})
      if(operation.toLowerCase() === "add"){
        const result = await User.findOneAndUpdate({ _id: "60806b3d1da82403653f343c" }, 
          { cart: cart.map((cartObj) => cartObj.productId === productId ? {...cartObj, qty: 
            cartObj.qty + 1 } : cartObj ) } )
        res.json({
          success: true,
          status: 200,
          result: 'Quantity updated for the product'
        })
      }else if(operation.toLowerCase() === "sub"){
        const result = await User.findOneAndUpdate({ _id: "60806b3d1da82403653f343c" }, 
          { cart: cart.map((cartObj) => cartObj.productId === productId ? {...cartObj, qty: 
            cartObj.qty - 1 } : cartObj ) } )
        res.json({
          success: true,
          status: 200,
          result: 'Quantity updated for the product'
        })
      }
    }catch(e){
      res.status(400).json({
        success: false,
        error: e.message,
        result: 'Error occured'
      })
    }
  })

router.route('/remove')
  .post(async (req,res)=>{
    const { productId } = req.body
    try{
      const { cart } = await User.findById({_id: "60806b3d1da82403653f343c"})
      const result = await User.findOneAndUpdate({ _id: "60806b3d1da82403653f343c" }, 
        { cart: cart.filter((cartObj) => cartObj.productId !== productId) } )
      res.json({
        success: true,
        status: 200,
        result: 'Product remmoved from the cart'
      })
    }catch(e){
      res.status(400).json({
        success: false,
        error: e.message,
        result: 'Error occured'
      })
    }
  })

module.exports = router