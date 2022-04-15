import React, {useEffect, useState} from 'react'
import{ useRef } from "react"
import { useAuth } from "../contexts/AuthContext"

import Axios from 'axios'

const Setting = () => {

    const { currentUser } = useAuth()

    const userID = currentUser.uid
    const [name, setName] = useState('') // pass the empty string
    const [age, setAge] = useState(0) // pass the initial value
    const [wage, setWage] = useState(0) // pass the initial value

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

    const [stockChange, setStockChange] = useState('') // pass the empty string
    const [buyPriceChange, setBuyPriceChange] = useState(0) // pass the initial value
    const [quantityChange, setQuantityChange] = useState(0) // pass the initial value
    
    const updadeAholding = () => {
        Axios.put("http://localhost:3001/updateAholding", {
          userID: userID,
          stock: stockChange,
          buyPrice: buyPriceChange,
          quantity: quantityChange,
          cost: buyPriceChange*quantityChange
        }).then(() => {
            console.log("success updateAholdings") // make good use of the userList without click, not applicable in this situation with ... destrcutor
        });
    };

    return (
        <div>
            <h2>Setting</h2>
            <p>Later change change into a pop up window or migrate to another page</p>
            <div className='row'>
                <div>
                    <h2>Change the account</h2>
                    <div>
                        <label>Name: </label>
                        <input type='text' onChange={(event)=>{setName(event.target.value)}} />
                    </div>
                    <div>
                        <label>Age: </label>
                        <input type='number' onChange={(event)=>{setAge(event.target.value)}} />
                    </div>
                    <div>
                        <label>Wage (year): </label>
                        <input type='number' onChange={(event)=>{setWage(event.target.value)}} />
                    </div>
                    <div>
                        <button onClick={addUser}>Add User</button>
                    </div>
                </div>

                <div>
                    <h2>Test: add a holdings</h2>
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
                        <button onClick={addAholding}>Add a holding</button>
                    </div>
                </div>

                <div>
                    <h2>Test: update the holdings</h2>
                    <div>
                        <label>Stock: </label>
                        <input type='text' placeholder=' symbol' onChange={(event)=>{setStockChange(event.target.value)}} />
                    </div>
                    <div>
                        <label>Price: </label>
                        <input type='number' onChange={(event)=>{setBuyPriceChange(event.target.value)}} />
                    </div>
                    <div>
                        <label>Quantity: </label>
                        <input type='number' onChange={(event)=>{setQuantityChange(event.target.value)}} />
                    </div>
                    <div>
                        <button onClick={updadeAholding}>Update a holding</button>
                    </div>    
                </div>                 
            </div>                 
        </div>
    )
}

export default Setting
