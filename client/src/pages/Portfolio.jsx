
import React, {useEffect, useState} from 'react'

import { Link } from 'react-router-dom'

import Chart from 'react-apexcharts'

import { useSelector } from 'react-redux'

import StatusCard from '../components/status-card/StatusCard'

import Table from '../components/table/Table'

import Badge from '../components/badge/Badge'

import statusCards from '../assets/JsonData/status-card-data.json'

import postImage from '../assets/images/post2.jfif'

import Tabs from "../components/portfolioTabs/portfolioTabs"
import { useAuth } from "../contexts/AuthContext"

import Axios from 'axios'

const Portfolio = () => {

    const { currentUser } = useAuth()
    const userID = currentUser.uid // ZtGPo16e7rdc3lt0m4xGAK8PsB03

    const [userHoldings, setUserHoldings] = useState([]);

    const getHoldings = (userID) => {
        // console.log(currentUser.uid)
        Axios.get(`http://localhost:3001/holdings${userID}`).then( // Axios.get('http://localhost:3001/holdings', {userID: currentUserID})
            (response) => {
                // console.log(currentUser.uid)
                console.log(response.data)
                setUserHoldings(response.data) // response has a propert call data
            }
        ); // get request, response contains everything send from the backend
    };

    return (
        <div className='row'>
            {/* <h6>Current Date: 2021-11-08 [Day 0]</h6> */}
            <div className='col-12'>
                    <h2 className='container-div'>Portfolio</h2>
            </div>
            <Tabs />
        </div>
    )
}

export default Portfolio

   