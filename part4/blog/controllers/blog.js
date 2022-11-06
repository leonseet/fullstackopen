const blogRouter = require("express").Router()
const Blog = require("../models/blog")
const config = require("../utils/config")
const jwt = require("jsonwebtoken")
const User = require("../models/user")


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate("user")
  response.json(blogs)
  })

  
blogRouter.post('/', async (request, response) => {
  // user auth
  const decodedToken = jwt.verify(request.token, config.SECRET)
  if(!request.token || !decodedToken.id) {
    return response.status(400).json({error: "token missing or invalid"})
  }
  const user = request.user

  if (!("likes" in request.body)) {
    request.body["likes"] = 0
  }
  if (!("title" in request.body) || !("url" in request.body)) {
    return response.status(400).json("message: title or url properties are missing from the request data")
  }

  const blog = new Blog({...request.body, user: user._id})
  const result = await blog.save()

  user.blogs = user.blogs.concat(result._id)
  await user.save()

  return response.status(201).json(result)
})


blogRouter.delete("/:id", async (request, response) => {
  const decodedToken = jwt.verify(request.token, config.SECRET)
  const user = request.user
  if(!request.token || !decodedToken.id) {
    return response.status(400).json({error: "token missing or invalid"})
  }
  id = request.params.id
  const blog = await Blog.findById(id)

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndRemove(id)
    response.status(204).end()
  } else {
    response.status(401).json({error: "unauthorized"})
  }
})


blogRouter.put("/:id", async (request, response) => {
  const body = request.body
  
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.status(200).json(updatedBlog)
})

module.exports = blogRouter