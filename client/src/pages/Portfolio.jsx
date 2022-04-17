
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

import Axios from 'axios'

const Portfolio = () => {

    return (
        <div>
            <h6>Current Date: 2021-11-08 [Day 0]</h6>
            <Tabs />
        </div>
    )
}

export default Portfolio

   