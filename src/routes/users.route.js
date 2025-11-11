const { Router } = require('express')
const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/users.controller')

const routerUser = Router()



routerUser.get('/', getUsers)
routerUser.get('/:id', getUser)
routerUser.post('/', createUser)
routerUser.put('/:id', updateUser)
routerUser.delete('/:id', deleteUser)


module.exports = { routerUser }