const {Pool} = require('pg')

const pool = new Pool({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "123",
    database: "postgres",
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

pool.connect((err,clinet ,release)=>{
    if(err) return console.log(err);
    clinet.query('SELECT NOW()',(err , result)=>{
        release()
        if(err) return console.log(err);
        console.log("connec to the database");
    })
})

module.exports = pool