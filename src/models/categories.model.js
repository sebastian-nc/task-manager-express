const pool = require('../config/db')

async function getCategories() {
    const { rows } = await pool.query('SELECT * FROM categories')
    return rows
}

async function getCategoriById(id) {
    const { rows } = await pool.query('SELECT * FROM categories WHERE id = $1', [id])
    return rows[0]
}

async function createCategory(name) {
    const { rows } = await pool.query('INSERT INTO categories (name) VALUES ($1) RETURNING *', [name])
    return rows[0]
}

async function updateCategory(id, name) {
    const { rows } = await pool.query('UPDATE categories SET name = $1 WHERE id = $2 RETURNING *', [name, id])
    return rows[0]
}

async function deleteCategory(id) {
    const { rowCount } = await pool.query('DELETE FROM categories WHERE id = $1', [id])
    return rowCount > 0
}

module.exports = {
    getCategories,
    getCategoriById,
    createCategory,
    updateCategory,
    deleteCategory
}