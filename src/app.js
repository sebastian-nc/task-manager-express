const express = require('express')

const { routerUser } = require('./routes/users.route')
const { routerCategories } = require('./routes/categories.route')
const { routerTasks } = require('./routes/tasks.route')
const { errorHandler } = require('./middlewares/error.handler')

const app = express()
app.use(express.json())


app.use('/api/users', routerUser)
app.use('/api/categories', routerCategories)
app.use('/api/tasks', routerTasks)


app.use(errorHandler)

module.exports = app