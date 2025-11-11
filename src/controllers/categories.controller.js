const categoriesModel = require('../models/categories.model');



async function getCategories(req, res) {
    const categories = await categoriesModel.getCategories()
    res.json(categories);
}

async function getCategorie(req, res) {
    const { id } = req.params;
    const category = await categoriesModel.getCategoriById(id);
    res.json(category);
}

async function createCategory(req, res) {
    const { name } = req.body;
    const newCategory = await categoriesModel.createCategory(name);
    res.status(201).json(newCategory);
}

async function updateCategory(req, res) {
    const { id} = req.params
    const { name, description } = req.body;
    const updatedCategory = await categoriesModel.updateCategory(id, name, description);
    res.json(updatedCategory);
}

async function deleteCategory(req, res) {
    const { id } = req.params;
    await categoriesModel.deleteCategory(id);
    res.status(204).send();
}

module.exports = {
    getCategories,
    getCategorie,
    createCategory,
    updateCategory,
    deleteCategory
};