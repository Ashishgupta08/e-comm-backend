const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { User, Product } = require('../models/models.js')

router.route('/')
  .get(async (req, res) => {
    try {
      const { wishlist } = await User.findById("60806b3d1da82403653f343c")
      const products = await Product.find()
      let wishlistProducts = products.map(product => {
      return wishlist.filter(item => item === product._id.toString()).length !== 0 && product
      })
      const wishlistItems = wishlistProducts.filter(item=>item !== false)
      res.json({
        success: true,
        status: 200,
        wishlist: wishlistItems
      })
    } catch (e) {
      res.status(404).json({
        success: false,
        status: 404,
        result: 'Wishlist not found'
      })
    }
  })

  .post(async (req, res) => {
    const { newWishlist } = req.body
    try {
      const result = await User.findOneAndUpdate({ _id: "60806b3d1da82403653f343c" }, { $push: { wishlist: newWishlist } })
      res.json({
        success: true,
        comment: 'Wishlist added',
        result: result.wishlist
      })
    } catch (e) {
      res.status(404).json({
        success: false,
        status: 404,
        result: 'Wishlist not updated'
      })
    }
  })

router.route('/update')
  .post(async (req, res) => {
    const { productId } = req.body
    try{
      const { wishlist } = await User.findById({_id: "60806b3d1da82403653f343c"})
      const result = await User.findOneAndUpdate({ _id: "60806b3d1da82403653f343c" }, 
        { wishlist: wishlist.filter((wishlistItem) => wishlistItem !== productId) } )
      res.json({
        success: true,
        status: 200,
        result: 'Product remmoved from the wishlist'
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