const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")
const User = require("../models/user")
const helper = require("../utils/test_helper")
const config = require("../utils/config")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// beforeEach(async () => {

//     await Blog.insertMany(helper.initialBlogs);
//   });

describe("blog addition", () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        const passwordHash = await bcrypt.hash("password", 10)
        const user = await new User({
            username: "testuser",
            password: passwordHash
        }).save()
    
        const userForToken = {username: user.username, id: user.id}
        token = jwt.sign(userForToken, config.SECRET)
    
        await Blog.insertMany(helper.initialBlogs)
    
        return(token = token)
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
            .set("Authorization", `Bearer ${token}`)
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
            .set("Authorization", `Bearer ${token}`)
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
            .set("Authorization", `Bearer ${token}`)
            .send(newBlog1)
            .expect(400)
            .expect("Content-Type", /application\/json/)
    
        await api
            .post("/api/blogs")
            .set("Authorization", `Bearer ${token}`)
            .send(newBlog2)
            .expect(400)
            .expect("Content-Type", /application\/json/)
        
    })
})

describe("blog deletion", () => {
    // jest.setTimeout(60000)
    let token = null
    beforeEach(async () => {
      await Blog.deleteMany({});
      await User.deleteMany({});
  
      const passwordHash = await bcrypt.hash("12345", 10);
      const user = await new User({ username: "name", passwordHash }).save();
  
      const userForToken = { username: "name", id: user.id };
      token = jwt.sign(userForToken, config.SECRET);
  
      const newBlog = {
        title: "some blog",
        author: "some author",
        url: "https://www.example.com",
      };
  
      await api
        .post("/api/blogs")
        .set("Authorization", `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);
  
      return token;
    })

    test("deletion of blog returns 204 No Content", async () => { 
        const blogsAtStart = await Blog.find({}).populate("user")
        const blogToDelete = blogsAtStart[0]
    
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set("Authorization", `Bearer ${token}`)
            .expect(204)
        
        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)
    })

    test("authorization fail", async () => {
        const blogsAtStart = await Blog.find({}).populate("user")
        const blogToDelete = blogsAtStart[0]
        console.log(blogsAtStart);
        token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Imxlb24yIiwiaWQiOiI2MzY4NGJmNzIwMzU4ZGY5MDAyNzgyZjciLCJpYXQiOjE2Njc3Nzk1ODN9.RFszyJw2jTE0MbWwM4YyX2AJOA8bBgx1cxhSaafv00M"

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set("Authorization", `Bearer ${token}`)
            .expect(401)
        
        const blogsAtEnd = await Blog.find({}).populate("user")
        expect(blogsAtEnd).toEqual(blogsAtStart)
    })
})

describe("blog update", () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        const passwordHash = await bcrypt.hash("password", 10)
        const user = await new User({
            username: "testuser",
            password: passwordHash
        }).save()
    
        const userForToken = {username: user.username, id: user.id}
        token = jwt.sign(userForToken, config.SECRET)
    
        await Blog.insertMany(helper.initialBlogs)
    
        return(token = token)
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
})

afterAll(() => {
    mongoose.connection.close()
})