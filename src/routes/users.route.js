const { Router } = require('express')
const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../controllers/users.controller')
const { validateSchema } = require('../middlewares/validate.middleware')
const { schemaUser  } = require('../schemas/users.schema')

const routerUser = Router()



routerUser.get('/', getUsers)
routerUser.get('/:id', getUser)
routerUser.post('/', validateSchema(schemaUser), createUser)
routerUser.put('/:id', validateSchema(schemaUser), updateUser)
routerUser.delete('/:id', deleteUser)


module.exports = { routerUser }