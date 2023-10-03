const express=require('express')
const { createUser, loginUser, updateUser } = require('../controller/userController')
const router=new express()
const { authMiddleware } = require('../middleware/authMiddleware')

router.post('/create', createUser)
router.post('/login', loginUser)
router.put('/update', authMiddleware,  updateUser)


module.exports=router