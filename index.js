const express = require('express');
const pool = require('./database');
const queries = require('./Query/psql-query')

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', "ejs")

app.get('/', async (req, res) => {
    try {
        let data = await pool.query(queries.GET_ALL_TODOS)
        res.render('index', { data: data.rows })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

app.post('/filter', async (req, res) => {
    try {
        let { date } = req.body
        let sameDate = await pool.query(queries.SAME_DATE_TODO , [date])
        console.log(sameDate.rows);
        let data = await pool.query(queries.FILTER_DATE(date))
        res.render('filter', { data: data.rows })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})  

app.post('/addTodo', async (req, res) => {
    let { todo, date } = req.body

    try {
        let result = await pool.query(queries.ADD_TODO, [todo, date])
        // console.log(result);
        res.redirect('/')
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error })
    }
})

app.get('/edit/:id', async (req, res) => {
    try {
        let { id } = req.params
        let data = await pool.query(queries.EDIT_TODO(id))

        res.render('update', { data: data.rows })
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

app.post('/update/:id', async (req, res) => {
    try {
        let { todo, date } = req.body
        let { id } = req.params
        let result = await pool.query(queries.UPDATE_TODO(todo, date , id))
        res.redirect('/')
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

app.get('/delete/:id', async (req, res) => {
    try {
        let { id } = req.params
        let result = await pool.query(queries.DELETE_TODO(id))
        res.redirect('/')
    } catch (error) {
        res.status(500).json({ error: error })
    }
})

app.post('/name/filter', async (req, res) => {
    let { gender , limit } = req.body
    let data 
    if (gender == 'asc') {
        data = await pool.query(queries.ASC_NAME(limit))
    } else if(gender == 'desc'){
        data = await pool.query(queries.DESC_NAME(limit))
    }
    else{
        data = await pool.query(queries.GET_ALL_TODOS)
    }
    res.render('index', { data: data.rows })
})
 
app.listen(3000, () => {
    console.log('server is running on port 3000')
    pool
})