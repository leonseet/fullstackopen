const config = require("./utils/config")
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const blogRouter = require("./controllers/blog")
const userRouter = require("./controllers/user")
const loginRouter = require("./controllers/login")
const middleware =require("./utils/middleware")
const logger = require("./utils/logger")

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)
    .then(() => logger.info("connected tp MongoDB"))
    .catch((error) => logger.error("error connection to MongoDB:", error.message))

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use("/api/blogs", middleware.userExtractor, blogRouter)
app.use("/api/users", userRouter)
app.use("/api/login", loginRouter)

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
  }

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
