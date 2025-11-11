const tasksModel = require('../models/tasks.model')


async function getTasks(req, res) {
    const tasks =  await tasksModel.getTasksAll()
    res.json(tasks)
}


async function getTask(req, res) {
    const { id } = req.params
    const task = await tasksModel.getTaskById(id)
    res.json(task)
}

async function createTask(req, res) {
    const body = req.body
    
    const taskJSON = {...body}

    const task = await tasksModel.createTask(taskJSON)

    res.json(task)
}


async function updateTask(req, res) {
    const { id } = req.params
    const body = req.body

    const taskJSON = {...body}

    const task = await tasksModel.updateTask(id, taskJSON)

    res.json(task)
}

async function deleteTask(req, res) {
    const { id } = req.params

    const result = await tasksModel.deleteTask(id)

    if (result) {
        res.json({ message: 'Task deleted successfully' })
    } else {
        res.status(404).json({ message: 'Task not found' })
    }
}


module.exports = { getTasks, getTask, createTask, updateTask, deleteTask }