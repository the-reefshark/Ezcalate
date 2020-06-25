const Pool = require('pg').Pool

const pool = new Pool({
  user: 'my_user',
  host: 'localhost',
  database: 'my_database',
  password: 'root',
  // password: 'Sector37.',
  port: 5432,
});

pool.on('error', (err, client) => {
  console.error('Error: ', err);
});

pool.connect();

// Get TodoList from database sorted by given parameter
const getTodolist = sort_by => {
  let text = 'SELECT * FROM tododata ORDER BY completed ASC, ' + sort_by + ' ASC'

  return new Promise(function(resolve, reject) {
    pool.query(text, (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results);
    })
  })
}

// Get TodoList from database filtered by given param and sorted by given parameter (sort_by)
const getFilteredTodolist = body => {
  const { param, value, sort_by } = body

  const text = 'SELECT * FROM tododata WHERE ' + param + ' = ' + value + ' ORDER BY completed ASC, ' + sort_by + ' ASC'

  return new Promise(function(resolve, reject) {
    pool.query(text, (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results);
    })
  })
}

// Update database with update values
const updateTodoItem = (body) => {
  return new Promise(function(resolve, reject) {

    const { id, task_name, details, completed, activity_type, duedate, dateCompleted } = body
    console.log(duedate)

    pool.query('UPDATE tododata SET task_name = $2, details = $3, completed = $4, activity_type = $5, duedate = $6, dateCompleted = $7 WHERE id = $1 RETURNING *', [id, task_name, details, completed, activity_type, duedate, dateCompleted], 
      (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`A new item has been updated:  `)
      })
  })
}

const createTodoItem = (body) => {
  return new Promise(function(resolve, reject) {

    const { task_name, details, completed, activity_type, duedate, dateCompleted } = body
    
    pool.query('INSERT INTO tododata ( task_name, details, completed, activity_type, duedate, dateCompleted ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [task_name, details, completed, activity_type, duedate, dateCompleted], 
      (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`A new item has been added:  `)
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
  getFilteredTodolist,
  updateTodoItem,
  createTodoItem,
  deleteTodoItem,
}