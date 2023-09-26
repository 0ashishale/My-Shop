// userRoute

const express = require('express')

const router = express.Router()
const { register, getAllUsers, updateUser, deleteUser, updateUserProfile, updatePassword } = require("./userController");
const { authorizedRole, isAuthenticated } = require('../../middleware/auth');


router.post("/register", register);
router.get('/admin/allusers',isAuthenticated,authorizedRole('admin'), getAllUsers)
router.put('/admin/user/:id',isAuthenticated, authorizedRole('admin'), updateUser)
router.delete('/admin/user/:id',isAuthenticated, authorizedRole('admin'), deleteUser)
router.put('/user/update-profile/:id', updateUserProfile)
router.put('/update-password', updatePassword )





module.exports = router