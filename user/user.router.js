const express = require('express')
const mongoose = require('mongoose')
const { Schema } = mongoose
const router = express.Router()
const {User} = require('../models/models.js')


router.route('/')
  .get(async (req,res)=>{
    const users = await User.find()
    res.json({
      success: true,
      status: 200,
      result: users
    })
  })

  .post(async (req,res)=>{
    const {username, password} = req.body
    try{
      const newUser = await new User({
        username: username,
        password: password,
        wishlist: undefined,
        cart: undefined
      })
      const user = await newUser.save()
      res.status(200).json({
        success:true,
        comment:"User created",
        result:user
      })

    }catch(e){
      res.status(409).send({
        success: false,
        error: e.message,
        result: 'User not created'
      })
    }
  })

module.exports = router