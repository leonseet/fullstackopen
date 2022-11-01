const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'sample blog',
    author: "Leon",
    url: "www.leonblog.com",
    likes: 5
  }
]

// const nonExistingId = async () => {
//   const note = new Note({ content: 'willremovethissoon', date: new Date() })
//   await note.save()
//   await note.remove()

//   return note._id.toString()
// }

const blogsInDb = async () => {
  const notes = await Blog.find({})
  return notes.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb
}