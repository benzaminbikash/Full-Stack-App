const blogModel = require("../model/blogModel");
const { asyncHandler } = require("../utils/asyncHandler");
//create blog
const createBlog = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const { _id } = req.user;
  if (!title || !description) throw new Error("Title and Description are required!");
  const blog = await blogModel.create({
    title: title,
    description: description,
    postBy: _id,
  });
  const b = await blog.save();
  res.status(200).json({
    status: true,
    message: "Blog Create Successfully",
    blog: b,
  });
});
// all user blogs
const allBlogGet = asyncHandler(async (req, res) => {
  const blog = await blogModel.find().populate('postBy');
  res.status(200).json({
    status: true,
    message: "All Blog",
    blogs: blog,
  });
});
//single user blogs
const getByUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const blog = await blogModel.find({ postBy: _id });
  res.status(200).json({
    status: true,
    message: "Your Blogs",
    blog: blog,
  });
});
//update blog
const updateBlog = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const { title, description } = req.body;
  const findBlog = await blogModel.findById(_id);
  const blog = await blogModel.findByIdAndUpdate(_id, {
    $set: {
      title: title || findBlog.title,
      description: description || findBlog.description,
    },
  });
  res.status(200).json({
    status: true,
    message: "Update Successfully!",
    blog: blog,
  });
});

//delete blog
const deleteBlog = asyncHandler(async (req, res) => {
    const { _id } = req.params;
     await blogModel.findByIdAndDelete(_id);
    res.status(200).json({
      status: true,
      message: "Delete Successfully!",
    });
  });
module.exports = { createBlog, allBlogGet, getByUser, updateBlog, deleteBlog };
