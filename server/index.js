const express = require('express')
const app = express()

const mysql = require('mysql')

const cors = require('cors')

// import { useAuth } from '../client/src/contexts/AuthContext'
// const { currentUser } = useAuth()

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
    const product = req.body.age*req.body.wage
    
    db.query('INSERT INTO userinfo (userID, name, age, wage, product) VALUES (?,?,?,?,?)', [userID, name, age, wage, product], (err, result) => {
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

// userID = 'ZtGPo16e7rdc3lt0m4xGAK8PsB03'

// get the holdings for PortfolioTabs

// original is get, now change to post as need to get the uerID
app.post('/holdings', (req, res) => { // standard for creating express when using request
    const userID = req.body.userID
    // console.log(userID)

    db.query("SELECT * FROM fypsystem.userholdings where userID = ? and holdingNow = 1", [userID], 
    (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result) // or res.json or res.send
        }
    })
});

app.put('/update', (req, res) => {
    const userID = req.body.userID
    const stock = req.body.stock
    const buyPrice = req.body.buyPrice
    const quantity = req.body.quantity
    const cost = req.body.buyPrice*req.body.quantity

    db.query('UPDATE SET userholdings buyPrice = ? quantity = ? cost = ? cost = ? WHERE userID = ? and stock = ?', 
    [buyPrice, quantity, cost, userID, stock]), 
    (err, res) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(res)
        }
    }

}) // update the database

// app.delete() // delete the data in the database


app.listen(3001, 
    () => {console.log("Hey, server running on port 3001");
});
