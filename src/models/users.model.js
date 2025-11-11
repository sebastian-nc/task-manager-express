const pool = require('../config/db')


async function getUsers() {
    const { rows } = await pool.query('SELECT * FROM users;')
    return rows
}

async function getUser(id) {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id])
    return rows[0]
}

async function createUser(name, email, age) {
    try {
        const query = {
            text: 'INSERT INTO users(name, email, age) VALUES($1,$2,$3) RETURNING *',
            values: [name, email, age]
        }
        const { rows } = await pool.query(query)
        return rows[0]
    } catch (error) {
        if (error.code == '23505') {
            throw Error('Email exists')
        }
        throw error.message
    }
}


async function updateUser(id, name, email, age) {
    const query = {
        text: 'UPDATE users SET name = $1, email = $2, age = $3 WHERE id = $4 RETURNING *',
        values: [name, email, age, id]
    }
    const { rows } = await pool.query(query)
    return rows[0]
}

async function deleteUser(id) {
    const { rowCount } = await pool.query('DELETE FROM users WHERE id = $1', [id])
    return rowCount > 0
}


module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}