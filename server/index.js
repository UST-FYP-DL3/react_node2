const express = require('express')
const app = express()

let {PythonShell} = require('python-shell')
const request = require('request')

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

app.post('/adduser', (req, res) => { // request and response, res => send sth to the front
    const userID = req.body.userID
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const age = req.body.age
    const wageMonthly = req.body.wageMonthly
    const initialInvest = req.body.initialInvest
    const riskLevel = req.body.riskLevel
    // const product = req.body.age*req.body.wage

    const sql = 'INSERT INTO userinfo (userID, firstname, lastname, age, wagemonthly, initialinvestamount, riskacceptlevel) VALUES (?,?,?,?,?,?,?)'
    
    db.query(sql, [userID, firstName, lastName, age, wageMonthly, initialInvest, riskLevel], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send("Values Inserted")
        }
    });
})  // app.post or app.get, put or delete

app.get('/getuserinfo', (req, res) => { // standard for creating express when using request
    db.query('SELECT * FROM userinfo', (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result) // or res.json
        }
    })
});

app.post("/updateuserinfo", (req, res) => {
    const userID = req.body.userID
    const firstname = req.body.firstName
    const lastname = req.body.lastName
    const age = req.body.age
    const wagemonthly = req.body.wageMonthly
    const initialinvestamount = req.body.initialInvest
    const riskacceptlevel = req.body.riskLevel

    const sql = 'UPDATE userinfo SET userID = ?, firstname = ?, lastname = ?, age = ?, wagemonthly = ?, initialinvestamount = ?, riskacceptlevel = ?'

    db.query(
      sql,
      [userID, firstname, lastname, age, wagemonthly, initialinvestamount, riskacceptlevel],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
    });
});

// get the holdings for PortfolioTabs
// original is get, now change to post as need to get the uerID
// app.post('/holdings', (req, res) => {...})
// const userID = req.body.userID
app.get('/holdings:userID', (req, res) => { // standard for creating express when using request
    const userID = req.params.userID
    // console.log(userID)
    
    const sql = "SELECT * FROM fypsystem.userholdings where userID = ? and holdingNow = 1"

    db.query(sql, [userID], 
    (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            // console.log( result.map( (value, key) => (value.stock) ) )
            // console.log( result.map( (value, key) => (value.cost) ) )
            res.send(result) // or res.json or res.send
        }
    })
});

// get company name of a single stock
app.get('/singlestockdetails:stocksymbol', (req, res) => { // request and response, res => send sth to the front
    const stockSymbol = req.params.stocksymbol

    const sql = 'SELECT * FROM fypsystem.stockconstituents where Symbol = ?' 
    
    db.query(sql, [stockSymbol], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result) 
        }
    });
})

// get current (today) price of a stock
app.post('/stockcurrprice', (req, res) => { // request and response, res => send sth to the front
    const stockSymbol = req.body.stockSymbol + ' US EQUITY'
    const currDate = req.body.currDate

    const sql = 'SELECT * FROM fypsystem.stockpriceprediction where Stock = ? and Date = ?'
    
    db.query(sql, [stockSymbol, currDate], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result) 
        }
    });
})

// get yesterdayprice of a stock
app.post('/stockyesterdayprice', (req, res) => { // request and response, res => send sth to the front
    const stockSymbol = req.body.stockSymbol + ' US EQUITY'
    const currDate = req.body.currDate

    const sql = 'SELECT * FROM fypsystem.stockpriceprediction where stockrecordid = ((SELECT stockrecordid FROM fypsystem.stockpriceprediction where Stock = ? and Date = ?) - 1)'
    
    db.query(sql, [stockSymbol, currDate], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result) 
        }
    });
})

// get the close price of a stock with dates for chart
app.post('/stockpriceplot', (req, res) => { // request and response, res => send sth to the front
    const stockSymbol = req.body.stockSymbol + ' US EQUITY'
    const startPlotDate = req.body.startPlotDate
    const endPlotDate = req.body.endPlotDate

    const sql = 'SELECT Stock, Date, OPEN, HIGH, LOW, CLOSE FROM fypsystem.stockpriceprediction where Stock = ? and (Date BETWEEN ? AND ? )' 
    
    db.query(sql, [stockSymbol, startPlotDate, endPlotDate], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result) 
        }
    });
})

// get the indicator
app.post('/stocktradingindicators', (req, res) => { // request and response, res => send sth to the front
    const stockSymbol = req.body.stockSymbol + ' US EQUITY'
    const startIndicatorDate = req.body.startIndicatorDate
    const endIndicatorDate = req.body.endIndicatorDate

    const sql = 'SELECT * FROM fypsystem.technicaldata where Stock = ? and (Date BETWEEN ? AND ?) ORDER BY Date DESC;' 
    
    db.query(sql, [stockSymbol, startIndicatorDate, endIndicatorDate], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.json(result) 
        }
    });
})

app.post('/stockanalystratings', (req, res) => { // request and response, res => send sth to the front
    const stockSymbol = req.body.stockSymbol + ' US EQUITY'
    const startRatingDate = req.body.startRatingDate
    const endRatingDate = req.body.endRatingDate

    const sql = 'SELECT * FROM fypsystem.analystdata where Stock = ? and (Date BETWEEN ? AND ?) ORDER BY Date DESC;' 
    
    db.query(sql, [stockSymbol, startRatingDate, endRatingDate], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.json(result) 
        }
    });
})


app.post('/addAholding', (req, res) => { // request and response, res => send sth to the front
    const userID = req.body.userID
    const stock = req.body.stock
    const buyPrice = req.body.buyPrice
    const quantity = req.body.quantity
    const cost = req.body.buyPrice*req.body.quantity
    const holdingNow = 1
    // const product = req.body.age*req.body.wage

    const sql = 'INSERT INTO userholdings (userID, stock, buyPrice, quantity, cost, holdingNow) VALUES (?,?,?,?,?,?)'
    
    db.query(sql, [userID, stock, buyPrice, quantity, cost, holdingNow], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send("Values Inserted")
        }
    });
})  // app.post or app.get, put or delete

// update the database
app.put("/updateAholding", (req, res) => {
    const userID = req.body.userID
    const stock = req.body.stock
    const buyPrice = req.body.buyPrice
    const quantity = req.body.quantity
    const cost = req.body.buyPrice*req.body.quantity

    const sql = 'UPDATE userholdings SET buyPrice = ?, quantity = ?, cost = ? WHERE userID = ? and stock = ?'

    db.query(
      sql,
      [buyPrice, quantity, cost, userID, stock],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
    });
});
  
/*
// using app.post
app.post('/delete/:stockDeleting', (req, res) => {
    const stockDeleting = req.params.stockDeleting  // .stockDeleting refer to :stockDeleting
    const userID = req.body.userID

    const sql = 'DELETE FROM userholdings WHERE userID = ? and stock = ?'

    db.query(sql, [userID, stockDeleting], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
}) // delete the data in the database
*/

// using app.delete
app.delete('/delete/:userID/:stockDeleting', (req, res) => {
    const userID = req.params.userID
    const stockDeleting = req.params.stockDeleting  // .stockDeleting refer to :stockDeleting
    // console.log(userID)
    // console.log(stockDeleting)
    
    const sql = 'DELETE FROM userholdings WHERE userID = ? and stock = ?'

    db.query(sql, [userID, stockDeleting], (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
}) // delete the data in the database


app.get('/stockPredChart1:chart1StockName', (req, res) => {
    console.log(req.params.chart1StockName)
    var options = {
        mode: 'text',
        args: [
            req.params.chart1StockName,
        ]
    }

    PythonShell.run('../plotly/predictionCharts.py', options, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})

app.get('/searching:input', (req, res) => {
    console.log(req.params.input)
    var options = {
        mode: 'text',
        args: [
            req.params.input,
        ]
    }

    PythonShell.run('../plotly/search.py', options, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            res.send(result)
        }
    })
})

app.post('/plotingChartone', (req, res) => { // request and response, res => send sth to the front
    const stockName = req.body.chart1StockName
    console.log(stockName)

    PythonShell.run('../plotly/predictionCharts.py', stockName, (err, result) => {
        if (err) {
            console.log(err)
        }
        else {
            // res.send(result)
        }
    })
})


app.listen(3001, 
    () => {console.log("Hey, server running on port 3001");
});

// Tutorial: https://github.com/machadop1407/Simple-CRUD-React-Node-MySQL
