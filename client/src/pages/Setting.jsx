import React, {useEffect, useState} from 'react'
import{ useRef } from "react"
import { useAuth } from "../contexts/AuthContext"
import './setting.css';
import Axios from 'axios'

const Setting = () => {
    const { currentUser } = useAuth()

    const userID = currentUser.uid
    const [name, setName] = useState('') // pass the empty string
    const [age, setAge] = useState(0) // pass the initial value
    const [wage, setWage] = useState(0) // pass the initial value

    const [capital, setInvestmentCapital] = useState(0) // pass the initial value
    const [riskLevel, setRiskLevel] = useState(0) // pass the initial value

    const addUser = () => {
        Axios.post("http://localhost:3001/create", {
            userID: userID,
            name: name,
            age: age,
            wage: wage,
        }).then(() => {
            console.log("success") // make good use of the userList without click, not applicable in this situation with ... destrcutor
        });
    };

    const [stock, setStock] = useState('') // pass the empty string
    const [buyPrice, setBuyPrice] = useState(0) // pass the initial value
    const [quantity, setQuantity] = useState(0) // pass the initial value  

    const addAholding = () => {
        Axios.post("http://localhost:3001/addAholding", {
            userID: userID,
            stock: stock,
            buyPrice: buyPrice,
            quantity: quantity,
            cost: buyPrice*quantity
        }).then(() => {
            console.log("success addAholdings") // make good use of the userList without click, not applicable in this situation with ... destrcutor
        });
    };

    const [stockUpdate, setStockUpdate] = useState('') // pass the empty string
    const [buyPriceUpdate, setBuyPriceUpdate] = useState(0) // pass the initial value
    const [quantityUpdate, setQuantityUpdate] = useState(0) // pass the initial value

    // const stockHandling = ''
    
    const updateAholding = (stockUpdating) => { // updateAholding = () =>
        Axios.put("http://localhost:3001/updateAholding", {
            // tockHandling: stockHandling, // for creating update function for each stock
            userID: userID,
            stock: stockUpdate,
            buyPrice: buyPriceUpdate,
            quantity: quantityUpdate,
            cost: buyPriceUpdate*quantityUpdate
        }).then((response) => {
            console.log("success updateAholdings") // make good use of the userList without click, not applicable in this situation with ... destrcutor
        });
    };

    
    const [stockDelete, setStockDelete] = useState('')

    // using Axios.post
    /*
    // delete (sell all for a stock)
    const deleteAholding = (stockDeleting) => {
        Axios.post(`http://localhost:3001/delete/${stockDeleting}`, {
            userID: userID
        }).then((response) => {
            console.log('success deleteAholding')
        }) // use`
    }*/

    // using Axios.delete
    const deleteAholding = (stockDeleting) => {
        Axios.delete(`http://localhost:3001/delete/${userID}/${stockDeleting}`).then((response) => {
            console.log('success deleteAholding')
        }) // use`
    }

    return (
        <div style ={{border: "2px solid lightgrey", borderRadius: "10px",}}>
            <h2 className='container-div'>Setting</h2>
            <div className='flex'>
                <div id ="col1" class = "row"> 
                    <h3 id = "accountHeader">User Account Update</h3>
                    <div>
                        <label id ="label">Name </label>
                        <input type='text' onChange={(event)=>{setName(event.target.value)}} />
                    </div>
                    <div>
                        <label id ="label">Age </label>
                        <input type='number' onChange={(event)=>{setAge(event.target.value)}} />
                    </div>
                    <div>
                        <label id ="label">Wage (in annual) </label>
                        <input type='number' onChange={(event)=>{setWage(event.target.value)}} />
                    </div>
                    <div>
                        <label id ="label">Investment Capital </label>
                        <input type='number' placeholder=' in USD' onChange={(event)=>{setInvestmentCapital(event.target.value)}} />
                    </div>
                    <div>
                        <label id ="label">Risk Tolearance Level </label>
                        <input style ={{margin: "0.5vw", fontSize: "16px"}} type="radio" name="riskLevel" value="very high" onChange={(event)=>{setRiskLevel(event.target.value)}}/> Very High
                        <br></br>
                        <input style ={{margin: "0.5vw", fontSize:"16px"}} type="radio" name="riskLevel" value="high" onChange={(event)=>{setRiskLevel(event.target.value)}}/> High
                        <br></br>
                        <input style ={{margin: "0.5vw", fontSize:"16px"}} type="radio" name="riskLevel" value="medium" onChange={(event)=>{setRiskLevel(event.target.value)}}/> Medium
                        <br></br>
                        <input style ={{margin: "0.5vw", fontSize: "16px"}} type="radio" name="riskLevel" value="low" onChange={(event)=>{setRiskLevel(event.target.value)}}/> Low
                        <br></br>
                    </div>
                    <div style ={{margin: "1vh"}}>
                        <button class = "button-1" role = "button" onClick={addUser}>Add</button>
                    </div>
                </div>

                <div id ="col2" class = "row">
                    <h3 id = "holdingHeader">Add holdings</h3>
                    <div>
                        <label id ="label">Stock </label>
                        <input type='text' placeholder=' enter stock symbol' onChange={(event)=>{setStock(event.target.value)}} />
                    </div>
                    <div>
                        <label id ="label">Price </label>
                        <input type='number' onChange={(event)=>{setBuyPrice(event.target.value)}} />
                    </div>
                    <div>
                        <label id ="label">Quantity </label>
                        <input type='number' onChange={(event)=>{setQuantity(event.target.value)}} />
                    </div>
                    <div style ={{margin: "1vh"}}>
                        <button class = "button-2" role = "button" onClick={addAholding}>Add</button>
                    </div>

                    <h3 id = "holdingHeader">Update holdings</h3>
                    <div>
                        <label id ="label">Stock </label>
                        <input type='text' placeholder=' enter stock symbol' onChange={(event)=>{setStockUpdate(event.target.value)}} />
                    </div>
                    <div>
                        <label id ="label">Price </label>
                        <input type='number' onChange={(event)=>{setBuyPriceUpdate(event.target.value)}} />
                    </div>
                    <div>
                        <label id ="label">Quantity </label>
                        <input type='number' onChange={(event)=>{setQuantityUpdate(event.target.value)}} />
                    </div>
                    <div style ={{margin: "1vh"}}>
                        <button class = "button-2" role = "button" onClick={()=>{updateAholding(stockUpdate)}}>Update</button> 
                    </div>

                    <h3 id = "holdingHeader">Delete holdings</h3>
                    <div>
                        <label id ="label">Stock </label>
                        <input type='text' placeholder=' enter stock symbol' onChange={(event)=>{setStockDelete(event.target.value)}} />
                    </div>
                    <div style ={{margin: "1vh"}}>
                        <button class = "button-2" role = "button" onClick={()=>{deleteAholding(stockDelete)}}>Delete</button> 
                    </div>
                </div>                
            </div>                 
        </div>
    )
}

// onclick={()=>{updadeAholding(val.id)}} // id to identify each update function where we need to use 
// the update function but for different <div> </div> which containes different content
// https://www.youtube.com/watch?v=AohARsUlwQk 14:27

export default Setting
