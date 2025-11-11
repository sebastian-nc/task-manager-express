const pool = require('../config/db')


async function getTasksAll() {
    const query = {
        text: ` 
        SELECT 
            t.id,
            t.title, 
            t.description, 
            u."name", 
            c."name", 
            t.status, 
            t.created_at  
            FROM tasks as t
        INNER JOIN users as u ON u.id = t.user_id
        INNER JOIN categories as c ON c.id = t.category_id
        ORDER BY t.created_at DESC    
        `,
    }
    const { rows } = await pool.query(query)
    return rows
}



async function getTaskById(id) {
    const { rows } = await pool.query('SELECT * FROM tasks WHERE id = $1', [id])
    return rows[0]
}


async function createTask(task) {
    const { title, description, status, user_id, category_id } = task
    const query = {
        text: 'INSERT INTO tasks (title, description, status, user_id, category_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        values: [title, description, status ?? 'pending', user_id, category_id],
    }
    const { rows } = await pool.query(query)
    return rows[0]
}

async function updateTask(id, task) {
    const { title, description, status, user_id, category_id } = task
    const query = {
        text: 'UPDATE tasks SET title = $1, description = $2, status = $3, user_id = $4, category_id = $5 WHERE id = $6 RETURNING *',
        values: [title, description, status, user_id, category_id, id],
    }
    const { rows } = await pool.query(query)
    return rows[0]

}

async function deleteTask(id) {
    const { rowCount } = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id])
    return rowCount > 0
}


module.exports = {
    getTasksAll,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
}