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
        <div>
            <h2>Setting</h2>
            <p>Later change into a pop up window or migrate to another page</p>
            <div className='row'>
                <div>
                    <h3>Add the account</h3>
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
                    <h3>Test: Add (buy) a holdings</h3>
                    <div>
                        <label>Stock: </label>
                        <input type='text' placeholder=' symbol' onChange={(event)=>{setStock(event.target.value)}} />
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
                    <h3>Test: update (buy more or sell) a holding</h3>
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
                        <button onClick={()=>{updateAholding(stockUpdate)}}>Update a holding</button> 
                    </div>    
                </div>
                <div>
                    <h3>Test: Delete (sell all) a holding</h3>
                    <div>
                        <label>Stock: </label>
                        <input type='text' placeholder=' symbol' onChange={(event)=>{setStockDelete(event.target.value)}} />
                    </div>
                    <button onClick={()=>{deleteAholding(stockDelete)}}>Delete</button>                   
                </div>                 
            </div>                 
        </div>
    )
}

// <button onClick={addAholding}>Add a holding</button>
// <button onClick={()=>{addAholding()}}>Add a holding</button>
// <button onClick={()=>{updateAholding()}}>Update a holding</button>
// <button onClick={updateAholding}>Update a holding</button>  

// onclick={()=>{updadeAholding(val.id)}} // id to identify each update function where we need to use 
// the update function but for different <div> </div> which containes different content
// https://www.youtube.com/watch?v=AohARsUlwQk 14:27

// delete can use .filter 29:20

export default Setting