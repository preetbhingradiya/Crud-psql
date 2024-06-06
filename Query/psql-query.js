const GET_ALL_TODOS = 'SELECT * FROM todo'

const ADD_TODO = 'INSERT INTO todo (todo, date) VALUES ($1 , $2) RETURNING *'
// const ADD_TODO = 'INSERT INTO todo (todo, date) VALUES ($1 , $2) '


const SAME_DATE_TODO = `SELECT date from todo where date = $1`; //only return date value
// const SAME_DATE_TODO = `SELECT * from todo where date = $1`; // return all the data properties

function FILTER_DATE(date) {
    return `SELECT * FROM todo WHERE date = '${date}'`
}

function EDIT_TODO(id) {
    return `SELECT * FROM todo WHERE id = '${id}'`
}

function UPDATE_TODO(todo, date, id) {
    return `UPDATE todo SET todo = '${todo}', date = '${date}' WHERE id = '${id}'`
}

function DELETE_TODO(id) {
    return `DELETE FROM todo WHERE id = '${id}'`
}

function ASC_NAME(limit) {
    return `SELECT * FROM todo  ORDER BY todo ASC LIMIT '${limit}'`
}

function DESC_NAME(limit) {
    return `SELECT * FROM todo  ORDER BY todo DESC LIMIT '${limit}'`
}

module.exports = { GET_ALL_TODOS, ADD_TODO, SAME_DATE_TODO, ASC_NAME, DESC_NAME, FILTER_DATE, EDIT_TODO, UPDATE_TODO, DELETE_TODO }