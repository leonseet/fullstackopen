const blogRouter = require("express").Router()
const Blog = require ("../models/blog")

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
  })
  
blogRouter.post('/', async (request, response) => {
  if (!("likes" in request.body)) {
    request.body["likes"] = 0
  }
  if (!("title" in request.body) || !("url" in request.body)) {
    return response.status(400).json("message: title or url properties are missing from the request data")
  }
  const blog = new Blog(request.body)
  const result = await blog.save()
  return response.status(201).json(result)
})

blogRouter.delete("/:id", async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
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