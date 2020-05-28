const Pool = require('pg').Pool

const pool = new Pool({
  user: 'my_user',
  host: 'localhost',
  database: 'my_database',
  //password: 'Sector37.',
  password: 'root',
  port: 5432,
  //change this to your info
});

pool.on('error', (err, client) => {
  console.error('Error: ', err);
});

pool.connect();

const getTodolist = () => {
  return new Promise(function(resolve, reject) {
    pool.query('SELECT * FROM tododata ORDER BY id ASC', (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results);
    })
  })
}
const createTodoItem = (body) => {
  return new Promise(function(resolve, reject) {
    const { id, text, completed } = body
    pool.query('INSERT INTO tododata ( id, text, completed ) VALUES ($1, $2, $3) RETURNING *', [id, text, completed], 
      (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`A new item has been added added:  `)
      })
  })
}

const deleteTodoItem = (id) => {
  return new Promise(function(resolve, reject) {
    pool.query('DELETE FROM tododata WHERE id = $1', [id], (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(`Item deleted with ID: ${id}`)
    })
  })
}

module.exports = {
  getTodolist,
  createTodoItem,
  deleteTodoItem,
}