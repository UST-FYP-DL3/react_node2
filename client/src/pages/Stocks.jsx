import React, {useEffect, useState} from 'react'
import './Stocks.css';
import { useSelector } from 'react-redux'

import { useAuth } from "../contexts/AuthContext"

import { Link } from 'react-router-dom'

import Chart from 'react-apexcharts'

import StatusCard from '../components/status-card/StatusCard'

import Table from '../components/table/Table'

import Badge from '../components/badge/Badge'

import statusCards from '../assets/JsonData/status-card-data.json'

import Axios from 'axios'

const chartOptions = {
    series: [{
        name: 'Price',
        data: [154.2,157.4,156.3,151.7,147.9,159.6,154.1,164.3,158.9,162.6,163.6,161.8,155.7,161.3,160.7,163.09,165.2]
    }
    ],
    options: {
        color: ['green'],
        chart: {
            background: 'transparent'
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: ['23 Oct 2021', '24 Oct 2021', '25 Oct 2021', '26 Oct 2021', '27 Oct 2021', '28 Oct 2021', '29 Oct 2021', '30 Oct 2021', '31 Oct 2021', '01 Nov 2021', '02 Nov 2021', '03 Nov 2021','04 Nov 2021', '05 Nov 2021', '06 Nov 2021', '07 Nov 2021', '08 Nov 2021']
        },
        legend: {
            position: 'top'
        },
        grid: {
            show: false
        }
    }
}

const topIndicator = {
    head: [
        'ATR',
        'BB_MA',
        'EMAVG',
        'MOM',
        'RSI'
    ],
    body: [
        {
            "atr": "MSFT",
            "bb_ma": 10,
            "emavg": "$323.45",
            "mom": "$3234.50",
            "rsi": "0.5%"
        },
        {
            "atr": "MSFT",
            "bb_ma": 10,
            "emavg": "$323.45",
            "mom": "$3234.50",
            "rsi": "0.5%"
        },
        {
            "atr": "MSFT",
            "bb_ma": 10,
            "emavg": "$323.45",
            "mom": "$3234.50",
            "rsi": "0.5%"
        },
        {
            "atr": "MSFT",
            "bb_ma": 10,
            "emavg": "$323.45",
            "mom": "$3234.50",
            "rsi": "0.5%"
        },
    ]
}

const renderIndicatorHead = (item, index) => (
    <th key={index}>{item}</th>
)

const renderIndicatorBody = (item, index) => (
    <tr key={index}>
        <td>{item.stockname}</td>
        <td>{item.unit}</td>
        <td>{item.price}</td>
        <td>{item.capital}</td>
        <td>{item.return}</td>
    </tr>
)

const Stocks = () => {
    const themeReducer = useSelector(state => state.ThemeReducer.mode)
    return (
        <div style ={{border: "2px solid lightgrey", borderRadius: "10px"}}>
            <h2 className='container-div'>Stock Information</h2>
            <div style ={{display: "inline-block"}}>
                <h4 style ={{margin: "2vh", fontWeight: "600", marginBottom: "0.5vh"}}>Apple Inc.</h4>
          <span style ={{margin: "2vh", fontWeight: "400"}}>NasdaqGS: AAPL</span>      
            </div>
            <div style ={{display: "inline-block"}}>
                <button style ={{margin: "2vh"}} class="button-star" role="button">
                    <i style ={{color: "#ffbf00", float: "right", clear: "right"}}class='bx bxs-star'>
                        <text style ={{margin: "1vh",color: "#696969"}}>Save To Watchlist</text>
                    </i>
                </button>
            </div>
            <div style ={{border: "2px solid lightgrey"}}>
                <h2 style ={{margin: "2vh", fontWeight: "700", marginBottom: "0vh"}}>150.440</h2>
                <p style ={{color: "red",margin: "2vh", marginTop: "0vh", marginBottom: "0vh", fontWeight: "400"}}>151.28 (-0.55%)</p>
                <p style ={{margin: "2vh", marginTop: "0vh", fontWeight: "400"}}>At close: 2021-11-08  4:00 PM EDT (USD) · Market closed</p> 
            </div>
            <div>
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
            <div className="col-7">
                    <div className='card'>
                        <div className='card__header'>
                            <h3>Trading indicators</h3>
                        </div>
                        <div className='card__body'>
                            <Table
                                headData={topIndicator.head}
                                renderHead={(item, index) => renderIndicatorHead(item, index)}
                                bodyData={topIndicator.body}
                                renderBody={(item, index) => renderIndicatorBody(item, index)}
                            />
                        </div>
                        <div className='card__footer'>
                            <Link to='/'>View all</Link>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default Stocks
