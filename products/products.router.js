const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { Product } = require('../models/models.js')

router.route('/')
  .get(async (req,res)=>{
    const products = await Product.find()
    res.json({
      success: true,
      status: 200,
      result: products
    })
  })
  .post(async (req,res)=>{
    const {brand, name, price, imgUrl, size, color, type, gender, description, review, stock} = req.body 
    try{
      const newProduct = await new Product({
        brand: brand,
        name: name,
        price: {
          marked: price.marked,
          selling: price.selling
        },
        imgUrl: imgUrl,
        size: {uk:[size.uk],us:[size.us]},
        color: color,
        type: type,
        gender: gender,
        description: description,
        review: review,
        stock: stock
      })
      const product = await newProduct.save()
      res.status(200).json({
        success:true,
        comment:"Record inserted",
        product:product
      })
    }catch(e){
      res.status(409).json({
        success: false,
        error: e.message,
        result: `Error - Record not inserted`
      })
    }
  })

router.route('/:id')
  .get(async (req,res)=>{
    try{
      const id = req.params.id;
      const product = await Product.findById({_id: id});
      res.json({
        success: true,
        comment: `Product found`,
        result: product
      })
    }catch(e){
      res.status(404).json({
        success: false,
        error: e.message,
        result: `Error - Product not found`
      })
    }
  })
  .post((req,res)=>{
    res.json({
      success: true,
      id: req.params.id,
      result: req.body
    })
  })

module.exports = router