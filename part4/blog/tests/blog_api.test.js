const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")
const helper = require("../utils/test_helper")

beforeEach(async () => {
    await Blog.deleteMany({})
  
    const blogObjects = helper.initialBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

test("returns correct amount of blog posts in the JSON format", async () => {
    const response = await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)
    expect(response.body).toHaveLength(1)
})

test("verifies that the unique identifier property of the blog posts is named id", async () => {
    const response = await api.get("/api/blogs")
    expect(response.body[0].id).toBeDefined()
})

test("verifies creation of a new blog post", async () => {
    const newBlog = {
        title: 'new blog',
        author: "Leon 2",
        url: "www.leonblog2.com",
        likes: 12
    }

    const response = await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(n => n.title)
    expect(contents).toContain("new blog")
})

test("blog creation without likes defaults to zero", async () => {
    const newBlog = {
        title: "newer blog",
        author: "Leon",
        url: "www.leonblog.com"
    }

    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[1].likes === 0)
})

test("blog creation without title or url returns 400 Bad Request", async () => {
    const newBlog1 = {
        author: "Leon",
        title: "sample blog",
        likes: 12
    }

    const newBlog2 = {
        author: "Leon",
        url: "www.sampleblog.com",
        likes: 12
    }

    await api
        .post("/api/blogs")
        .send(newBlog1)
        .expect(400)
        .expect("Content-Type", /application\/json/)

    await api
        .post("/api/blogs")
        .send(newBlog2)
        .expect(400)
        .expect("Content-Type", /application\/json/)
    
})

test("deletion of blog returns 204 No Content", async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
})

test("update of blog returns 200 Success", async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const updatedBlog = {
        title: 'updated blog',
        author: "Leon",
        url: "www.leonblog.com",
        likes: 20
    }

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedBlog)
        .expect(200)  
        .expect("Content-Type", /application\/json/)
})

afterAll(() => {
    mongoose.connection.close()
})