const { Pool } = require('pg')

const env = require('dotenv')
env.config()

// Configuramos un pool de conexiones (buena práctica)
const pool = new Pool({
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  database: process.env.PGDATABASE,
  // ssl: {
  //   rejectUnauthorized: false    
  // }
})


// Probar conexión al iniciar
pool.connect()
  .then(client => {
    console.log('✅ Conectado a PostgreSQL')
    client.release()
  })
  .catch(err => console.error('❌ Error al conectar con PostgreSQL:', err))

module.exports = pool