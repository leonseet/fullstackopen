const Blog = require('../models/blog')
const User = require("../models/user")

const initialBlogs = [
  {
    title: 'sample blog',
    author: "Leon",
    url: "www.leonblog.com",
    likes: 5
  }
]

const blogsInDb = async () => {
  const notes = await Blog.find({}).populate("user")
  return notes.map(blog => blog.toJSON())
}

const initialUsers = [
  {
    username: 'leon',
    name: "Leon Seet",
    password: "password"
  }
]

const usersInDb = async () => {
  const users = await User.find({}).populate("blogs")
  return users.map(user => user.toJSON())
}


module.exports = {
    initialBlogs, blogsInDb,
    initialUsers, usersInDb
}