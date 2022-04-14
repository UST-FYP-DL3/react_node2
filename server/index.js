const express = require('express')
const app = express()

const mysql = require('mysql')

const cors = require('cors')

app.use(cors())
// use the json
app.use(express.json())

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'password', // empty or password or your own
    database: 'fypsystem' // name of scheme in mySQL
})

app.post('/create', (req, res) => { // request and response, res => send sth to the front
    const userID = req.body.userID
    const name = req.body.name
    const age = req.body.age
    const wage = req.body.wage
    
    db.query('INSERT INTO userinfo (userID, name, age, wage) VALUES (?,?,?,?)', [userID, name, age, wage], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send("Values Inserted")
        }
    });
})  // app.post or app.get, put or delete

app.get('/user', (req, res) => { // standard for creating express when using request
    db.query('SELECT * FROM userinfo', (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result) // or res.json
        }
    })
});

app.listen(3001, 
    () => {console.log("Hey, server running on port 3001");
});
