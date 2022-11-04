const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const User = require("../models/user")
const helper = require("../utils/test_helper")

beforeEach(async () => {
    await User.deleteMany({})
  
    const userObjects = helper.initialUsers
      .map(user => new User(user))
    const promiseArrayUser = userObjects.map(user => user.save())
    await Promise.all(promiseArrayUser)
  })

test("both username and password must be at least 3 characters long", async () => {
    const user = {
        username: "le",
        name: "Leon Seet",
        password: "pa"
    }

    const result = await api
        .post("/api/users")
        .send(user)
        .expect(400)
        .expect("Content-Type", /application\/json/)
    expect(result.body.error).toContain("both username and password must be at least 3 characters long")
})

test("both username and password must be given", async () => {
    const user = {
        name: "Leon Seet",
    }

    const result = await api
        .post("/api/users")
        .send(user)
        .expect(400)
        .expect("Content-Type", /application\/json/)
    expect(result.body.error).toContain("both username and password must be given")   
})

test("username must be unique", async () => {
    const user = {
        username: "leon",
        name: "Leon Seet",
        password: "password"
    }

    const result = await api
        .post("/api/users")
        .send(user)
        .expect(400)
        .expect("Content-Type", /application\/json/)
    expect(result.body.error).toContain("username must be unique")   
})

afterAll(() => {
    mongoose.connection.close()
})