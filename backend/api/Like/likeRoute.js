const router = require('express').Router()
const {isAuthenticated} = require('../../middleware/auth')
const { createLike, getLikeProducts,  } = require('./likeController')


router.post('/like', isAuthenticated, createLike)
router.get('/liked-products', isAuthenticated, getLikeProducts)




module.exports = router