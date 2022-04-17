import React, {useEffect, useState} from 'react'
import { useAuth } from "../contexts/AuthContext"

import { Link } from 'react-router-dom'

import Chart from 'react-apexcharts'

import { useSelector } from 'react-redux'

import StatusCard from '../components/status-card/StatusCard'

import Table from '../components/table/Table'

import Badge from '../components/badge/Badge'

import statusCards from '../assets/JsonData/status-card-data.json'

import postImage from '../assets/images/post2.jfif'
import Axios from 'axios'

const chartOptions = {
    series: [{
        name: 'Current week price',
        data: [160.5,159.3,158,158.5,159.8]
    },
    {
        name: 'Next week predicted price',
        data: [160.8,161.7,163,159.5,160]
    }
    ],
    options: {
        color: ['#2980b9', '#AA0000'],
        chart: {
            background: 'transparent'
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth'
        },
        xaxis: {
            categories: ['Mon', 'Tue', 'Wed', 'Thur', 'Fri']
        },
        legend: {
            position: 'top'
        },
        grid: {
            show: false
        }
    }
}

const Stocks = () => {
    const themeReducer = useSelector(state => state.ThemeReducer.mode)
    return (
        <div>
            <h2 className='container-div'>Stock History</h2>
            <h5>Apple Inc.</h5>
            <span>NasdaqGS: AAPL</span>
            <div className="col-7">
                    <div className="card full-height">
                    <Chart
                            
                            options={themeReducer === 'theme-mode-dark' ? {
                                ...chartOptions.options,
                                theme: { mode: 'dark'}
                            } : {
                                ...chartOptions.options,
                                theme: { mode: 'light'}
                            }}
                            
                            series={chartOptions.series}
                            type='line'
                            height='100%'
                        />
                    </div>
                </div>
        </div>
    )
}

export default Stocks
