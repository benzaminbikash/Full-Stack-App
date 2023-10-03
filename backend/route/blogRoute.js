const express=require('express')
const router=new express()
const { createBlog , allBlogGet, getByUser, updateBlog, deleteBlog} = require("../controller/blogController");
const { authMiddleware } = require('../middleware/authMiddleware')

router.post('/create',  authMiddleware, createBlog)
router.get('/all', allBlogGet)
router.get('/userblog', authMiddleware, getByUser)
router.put('/updateblog/:_id', authMiddleware, updateBlog)
router.delete('/deleteblog/:_id', authMiddleware, deleteBlog)





module.exports=router