const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")

const api = supertest(app)

const Blog = require("../models/blog")
const helper = require("../utils/test_helper")

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
    const response = await api.get("/api/blogs")
    expect(response.body[0].id).toBeDefined()
})


afterAll(() => {
    mongoose.connection.close()
})