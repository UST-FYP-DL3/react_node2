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
          capital: capital,
          riskLevel:riskLevel,
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
    
    const updateAholding = () => {
        Axios.put("http://localhost:3001/updateAholding", {
          userID: userID,
          stock: stockUpdate,
          buyPrice: buyPriceUpdate,
          quantity: quantityUpdate,
          cost: buyPriceUpdate*quantityUpdate
        }).then(() => {
            console.log("success updateAholdings") // make good use of the userList without click, not applicable in this situation with ... destrcutor
        });
    };

    return (
        <div style ={{border: "2px solid grey", borderRadius: "10px",}}>
            <h2 className='container-div'>Setting</h2>
            <div className='flex'>
                <div id ="col1"> 
                    <h3 id = "accountHeader">User Account Update</h3>
                    <div>
                        <label>Name: </label>
                        <input type='text' onChange={(event)=>{setName(event.target.value)}} />
                    </div>
                    <div>
                        <label>Age: </label>
                        <input type='number' onChange={(event)=>{setAge(event.target.value)}} />
                    </div>
                    <div>
                        <label>Wage (in annual): </label>
                        <input type='number' onChange={(event)=>{setWage(event.target.value)}} />
                    </div>
                    <div>
                        <label>Investment Capital: </label>
                        <input type='number' onChange={(event)=>{setInvestmentCapital(event.target.value)}} />
                    </div>
                    <div>
                        <label>Risk Tolearance Level: </label>
                        <input type='select' onChange={(event)=>{setRiskLevel(event.target.value)}} />
                    </div>
                    <div>
                        <button class = "button-1" role = "button" onClick={addUser}>Add</button>
                    </div>
                </div>

                <div id ="col2">
                    <h3 id = "holdingHeader">Add holdings</h3>
                    <div>
                        <label>Stock: </label>
                        <input type='text' onChange={(event)=>{setStock(event.target.value)}} />
                    </div>
                    <div>
                        <label>Price: </label>
                        <input type='number' onChange={(event)=>{setBuyPrice(event.target.value)}} />
                    </div>
                    <div>
                        <label>Quantity: </label>
                        <input type='number' onChange={(event)=>{setQuantity(event.target.value)}} />
                    </div>
                    <div>
                        <button class = "button-2" role = "button" onClick={addAholding}>Add</button>
                    </div>

                    <h3 id = "holdingHeader">Update holdings</h3>
                    <div>
                        <label>Stock: </label>
                        <input type='text' placeholder=' symbol' onChange={(event)=>{setStockUpdate(event.target.value)}} />
                    </div>
                    <div>
                        <label>Price: </label>
                        <input type='number' onChange={(event)=>{setBuyPriceUpdate(event.target.value)}} />
                    </div>
                    <div>
                        <label>Quantity: </label>
                        <input type='number' onChange={(event)=>{setQuantityUpdate(event.target.value)}} />
                    </div>
                    <div>
                        <button class = "button-2" role = "button" onClick={updateAholding}>Update</button> 
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
