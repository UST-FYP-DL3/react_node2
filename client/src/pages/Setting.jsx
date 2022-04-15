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

    const addaHolding = () => {
        Axios.post("http://localhost:3001/addaholding", {
          userID: userID,
          stock: stock,
          buyPrice: buyPrice,
          quantity: quantity,
          cost: buyPrice*quantity
        }).then(() => {
            console.log("success addaholdings") // make good use of the userList without click, not applicable in this situation with ... destrcutor
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
                        <button onClick={addaHolding}>Add a holding</button>
                    </div>
                </div>

                <div>
                    <h2>Test: update the holdings</h2>
                        
                </div>                 
            </div>                 
        </div>
    )
}

export default Setting
