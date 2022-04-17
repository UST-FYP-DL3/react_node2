import React, {useEffect, useState} from 'react'

import Table from '../components/table/Table'

import Axios from 'axios'

import customerList from '../assets/JsonData/customers-list.json'

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

const Analytics = () => {

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
                Analytics
            </h2>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card__body">
                            <Table
                                limit='10'
                                headData={customerTableHead}
                                renderHead={(item, index) => renderHead(item, index)}
                                bodyData={customerList}
                                renderBody={(item, index) => renderBody(item, index)}
                            />
                        </div>
                    </div>
                </div>
                <div className='col-12'>
                    <button onClick={getUser}>Show User</button>
                    {userList.map((value, key) => {
                        return <div>
                            {value.userID}<tr />
                            {value.name}<tr />
                            {value.age}<tr />
                            {value.wage}<tr />
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

// https://www.youtube.com/watch?v=re3OIOr9dJI 1:11:48
// ...userList in then() of Axios.get ... is destructor

export default Analytics
