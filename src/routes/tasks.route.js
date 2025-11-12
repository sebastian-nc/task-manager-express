const { Router } = require('express')
const { getTasks, getTask, createTask, updateTask, deleteTask } = require('../controllers/tasks.controller')
const routerTasks = Router()


routerTasks.get('/', getTasks)
routerTasks.get('/:id', getTask)
routerTasks.post('/', createTask)
routerTasks.put('/:id', updateTask)
routerTasks.delete('/:id', deleteTask)



module.exports = { routerTasks }