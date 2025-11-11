const { Router } = require('express')
const { getCategorie, getCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/categories.controller')



const routerCategories = Router()


routerCategories.get('/', getCategories)
routerCategories.get('/:id', getCategorie)
routerCategories.post('/', createCategory)
routerCategories.put('/:id', updateCategory)
routerCategories.delete('/:id', deleteCategory)


module.exports = { routerCategories }