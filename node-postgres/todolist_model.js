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

// Get TodoList from database filtered by given sort_by parameter
const getTodolist = (username, sort_by) => {
  const param = 'id' // Change this to change sorting param

  let today, startDate, endDate
  let text = "CREATE TABLE IF NOT EXISTS " + username + " (id SERIAL PRIMARY KEY, task_name VARCHAR, details VARCHAR, completed BOOLEAN, activity_type VARCHAR, duedate VARCHAR, dateCompleted VARCHAR, timer INTEGER);"
  
  switch (sort_by) {
    case 'All':
      text += 'SELECT * FROM ' + username + ' ORDER BY completed ASC, ' + param + ' ASC;'
      break
    case 'Completed':
      text += 'SELECT * FROM ' + username + ' WHERE completed = true ORDER BY completed ASC, ' + param + ' ASC;'
      break
    case 'Today':
      today = new Date()
      startDate = "'" + today.getFullYear() + "-0" + (today.getMonth() + 1) + "-" + today.getDate() + "'"
      text += 'SELECT * FROM ' + username + ' WHERE duedate = ' + startDate + ' ORDER BY completed ASC, ' + param + ' ASC;'
      break
    case 'Month':
      today = new Date()
      startDate = "'" + today.getFullYear() + "-" + (today.getMonth() + 1) + "-01'"
      endDate = "'" + today.getFullYear() + "-" + (today.getMonth() + 2) + "-01'"
      text += 'SELECT * FROM ' + username + ' WHERE duedate BETWEEN ' + startDate + ' AND ' + endDate + ' ORDER BY completed ASC, ' + param + ' ASC;'
      break
    case 'Year':
      today = new Date()
      startDate = "'" + today.getFullYear() + "-01-01'"
      endDate = "'" + (today.getFullYear() + 1) + "-01-01'"
      text += 'SELECT * FROM ' + username + ' WHERE duedate BETWEEN ' + startDate + ' AND ' + endDate + ' ORDER BY completed ASC, ' + param + ' ASC;'
      break
    default:
      text += "SELECT * FROM " + username + " tododata WHERE activity_type = '" + sort_by + "' ORDER BY completed ASC, " + param + " ASC;"
      break
  }

  return new Promise(function(resolve, reject) {
    pool.query(text, (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results)
    })
  })
}

// Get TodoList from database filtered by given param and sorted by given parameter (sort_by)
const getFilteredTodolist = (username, filter, value) => {
  const text = 'SELECT SUM(timer) FROM ' + username + ' WHERE ' + filter + " = '" + value + "'"

  return new Promise(function(resolve, reject) {
    pool.query(text, (error, results) => {
      if (error) {
        reject(error)
      }
      resolve(results);
    })
  })
}

// Update database with updated values
const updateTodoItem = body => {
  return new Promise(function(resolve, reject) {

    const { username, id, task_name, details, completed, activity_type, duedate, dateCompleted, timer } = body

    pool.query('UPDATE ' + username + ' SET task_name = $2, details = $3, completed = $4, activity_type = $5, duedate = $6, dateCompleted = $7, timer = $8 WHERE id = $1 RETURNING *',
        [id, task_name, details, completed, activity_type, duedate, dateCompleted, timer], 
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

    const { username, task_name, details, completed, activity_type, duedate, dateCompleted } = body
    
    pool.query('INSERT INTO ' + username + ' ( task_name, details, completed, activity_type, duedate, dateCompleted, timer ) VALUES ($1, $2, $3, $4, $5, $6, 0) RETURNING *',
        [task_name, details, completed, activity_type, duedate, dateCompleted], 
      (error, results) => {
        if (error) {
          reject(error)
        }
        resolve(`A new item has been added:  `)
      })
  })
}

const deleteTodoItem = (username, id) => {
  return new Promise(function(resolve, reject) {
    pool.query('DELETE FROM ' + username + ' WHERE id = $1', [id], (error, results) => {
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