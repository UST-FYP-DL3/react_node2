import React, {useEffect, useState} from 'react'

import Table from '../components/table/Table'

import Axios from 'axios'

import customerList from '../assets/JsonData/customers-list.json'

import { Container, Card } from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';

const customerTableHead = [
    '',
    'name',
    'email',
    'phone',
    'total orders',
    'total spend',
    'location'
]

const customerTableHead2 = [
    '',
    'userID',
    'name',
    'age',
    'wage',
]

const renderHead = (item, index) => <th key={index}>{item}</th>

const renderBody = (item, index) => (
    <tr key={index}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
        <td>{item.total_orders}</td>
        <td>{item.total_spend}</td>
        <td>{item.location}</td>
    </tr>
)

const renderHead2 = (item, index) => <th key={index}>{item}</th>

const renderBody2 = (item, index) => (
    <tr key={index}>
        <td>{item.userId}</td>
        <td>{item.name}</td>
        <td>{item.age}</td>
        <td>{item.wage}</td>
    </tr>
)

function Group() {

    const [userList, setUserList] = useState([]);

    const getUser = () => {
        Axios.get("http://localhost:3001/user").then(
            (response) => {
                console.log(response.data)
                setUserList(response.data) // response has a propert call data
            }
        ); // get request, response contains everything send from the backend
    };

    return (
        <div>
            <h2 className='container-div'>
                Group
            </h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                    </div>
                </div>
            </div>
        </div>
    )
}

// https://www.youtube.com/watch?v=re3OIOr9dJI 1:11:48
// ...userList in then() of Axios.get ... is destructor

export default Group
