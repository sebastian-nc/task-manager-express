const usersModel = require('../models/users.model')

async function getUsers(req, res, next) {
    const users = await usersModel.getUsers()
    if (users.length == 0) {
        const error = new Error('Users not found')
        error.statusCode = 404
        error.detail = 'Table blank'
        next(error)
        return;
    }
    res.json(users)
}

async function getUser(req, res, next) {
    const { id } = req.params


    if (!id) {
        const err = new Error('Id is required')
        next(err)
        return
    }

    const user = await usersModel.getUser(id)

    if (!user) {
        const err = new Error('Not found user with ID')
        err.statusCode = 404
        next(err)
        return
    }

    res.json(user)
}

async function createUser(req, res, next) {    
    try {
        const { name, email, age } = req.body
        const user = await usersModel.createUser(name, email, age)
        res.json(user)
    } catch (error) {
        next(error)
        return;
    }

}

async function updateUser(req, res, next) {
    const { id } = req.params

    const userDB = await usersModel.getUser(id)

    const { name, email, age } = {...userDB, ...req.body}

    const user = await usersModel.updateUser(id, name, email, age)

    if (!user) {
        const err = new Error('User no found with ID')
        err.statusCode = 404
        next(err)
        return
    }

    res.json(user)
}



async function deleteUser(req, res, next) {
    const { id } = req.params
    const deleted = await usersModel.deleteUser(id)
    console.log(deleted)
    if (!deleted) {
        const err = new Error('User not found with ID')
        err.statusCode = 404
        next(err)
        return
    }

    res.json({message: 'User whit ID deleted success'})
}

module.exports = { getUsers, getUser, createUser, updateUser, deleteUser }