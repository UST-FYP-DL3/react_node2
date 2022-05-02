import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom';
import { useAuth } from "../contexts/AuthContext"

import { Link } from 'react-router-dom'

import Chart from 'react-apexcharts'

import { useSelector } from 'react-redux'

import 'bootstrap/dist/css/bootstrap.min.css';

import StatusCard from '../components/status-card/StatusCard'
import IndicatorCard from '../components/status-card/indicatorCard'

import Table from '../components/table/Table'

import Badge from '../components/badge/Badge'

import statusCards from '../assets/JsonData/status-card-data.json'

import indicatorCards from '../assets/JsonData/indicator-card-data.json'

import postImage from '../assets/images/post2.jfif'
import './dashboard.css';
import Axios from 'axios'

import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';



const renderCusomerHead = (item, index) => (
    <th style ={{textAlign: "center"}} key={index}>{item}</th>
)

const renderCusomerBody = (item, index) => (
    <tr style ={{textAlign: "center"}} key={index}>
        <td>{item.stockname}</td>
        <td>{item.unit}</td>
        <td>{item.price}</td>
        <td>{item.capital}</td>
        <td style={{color: item.return >= 0 ? "green" : "red"}} >{item.return}%</td>
    </tr>
)


const Dashboard = () => {

    const { currentUser } = useAuth()

    const themeReducer = useSelector(state => state.ThemeReducer.mode)

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

    const [usertradingRecord, setuserTradingRecord] = useState([]);

    const getTradingRecording = (userIDget) => {
    Axios.post('http://localhost:3001/gettradingrecord', {
        userID: userIDget,
        }).then(
        (response) => {
            console.log(response.data);
            setuserTradingRecord(response.data);
        }
    )
    };
    const [colDefsTrading, setcolDefsTrading] = useState([
    { field: 'stock_code', sortable: true, filter: true, displayName: "Stock"  },
    { field: 'num_of_shares', sortable: true, filter: true, displayName: "Quantity"  },
    { field: 'entry_price', sortable: true, filter: true, displayName: "Entry Price"  },
    { field: 'pnl', sortable: true, filter: true, displayName: "P / L"  },
    ])

    const [userPerformanceData, setuserPerformanceData] = useState([])

    const getuserperformance = (userIDget) => {
      Axios.post('http://localhost:3001/getuserperformance', {
        userID: userIDget,
        }).then(
          (response) => {
            console.log(response.data);
            setuserPerformanceData(response.data);
            // console.log(currWeekRecomend);
            // setcurrWeekBuyCost( response.data.map( (value, key) => (value.predicted_cost) ).reduce( (accumulator, currentValue) => {return accumulator+currentValue} ) )
        }
      )
    };

    const chartOptions = {
        series: [{
            name: 'Growth Rate (in %) this year',
            data: userPerformanceData.map( (value, key) => value.growth_rate )
        }],
        options: {
            color: ['green'],
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
                categories: userPerformanceData.map( (value, key) => value.date ),
                type: 'datetime',
                title: { text: "Date", },
                labels: {
                    datetimeFormatter: {
                      year: 'yyyy',
                      month: 'MMM yyyy',
                      day: 'dd MMM',
                    }
                },
            },
            yaxis: {
                labels: {
                    formatter: function(val) { return (val*100).toFixed(2);}
                }
            },
            legend: {
                position: 'top'
            },
            grid: {
                show: false
            },
            annotations: {
                yaxis: [{
                  y: 0,
                  borderColor: 'red',
                  strokeDashArray: 0,
                  label: {
                    borderColor: 'red',
                    offsetX: '-100%', // - string for starting at 0
                    style: {
                      color: '#fff',
                      background: 'red',
                    },
                    text: '0%',
                  }
                }]
            },
        }
    }

    const [summaryData, setSummaryData] = useState([])
    const [summaryCard, setsummaryCard] = useState([
        {
            "icon": "bx bx-money-withdraw",
            "count": summaryData.length > 0? summaryData[0].current_balance.toFixed(2): null ,
            "title": "Current Balance"
        },
        {
            "icon": "bx bx-candles",
            "count": summaryData.length > 0? summaryData[0].weekly_profit.toFixed(2) : null,
            "title": "Weekly Profit"
        },
        {
            "icon": "bx bx-stats",
            "count": summaryData.length > 0? summaryData[0].total_asset.toFixed(2) : null,
            "title": "Total Assets"
        },
        {
            "icon": "bx bx-dollar-circle",
            "count": summaryData.length > 0? summaryData[0].cash.toFixed(2) : null,
            "title": "Cash"
        }
    ])

    const getaccountsummary = (userIDget) => {
      Axios.post('http://localhost:3001/getaccountsummary', {
        userID: userIDget,
        }).then(
          (response) => {
            console.log(response.data);
            setSummaryData(response.data);
            // console.log(currWeekRecomend);
            // setcurrWeekBuyCost( response.data.map( (value, key) => (value.predicted_cost) ).reduce( (accumulator, currentValue) => {return accumulator+currentValue} ) )
            setsummaryCard([
                {
                    "icon": "bx bx-money-withdraw",
                    "count": response.data.length > 0? response.data[0].current_balance.toFixed(2) : null ,
                    "title": "Current Balance"
                },
                {
                    "icon": "bx bx-candles",
                    "count": response.data.length > 0? response.data[0].weekly_profit.toFixed(2) : null,
                    "title": "Weekly Profit"
                },
                {
                    "icon": "bx bx-stats",
                    "count": response.data.length > 0? response.data[0].total_asset.toFixed(2) : null,
                    "title": "Total Assets"
                },
                {
                    "icon": "bx bx-dollar-circle",
                    "count": response.data.length > 0? response.data[0].cash.toFixed(2) : null,
                    "title": "Cash"
                }
            ]);
        }
      )
    };

    
      
    
    /*
    const addUser = () => {
        Axios.post('https://localhost:3001/create', {
            name: name, 
            age: age, 
            wage: wage
        }).then(() => {
            console.log("success")
        }); // the endpoint of our request // then: the whole function will stop until the function is done 
        // send info from frontend to backend, {} sending the body which is an object
    };
    */
    
    /*
    const displayInfo = () => {
        console.log(name + age + wage); // show the info for testing
    }*/
    useEffect( () => {
        getTradingRecording(userID);
        getuserperformance(userID);
        getaccountsummary(userID);
      }, []);

    return (
        <div>
            <h2 className='container-div'>Account Summary</h2>
            <h3 id = "subtitle" className="page-header">Portfolio performance</h3>
            <div className="row">
                <div className="col-5">
                    <div style ={{marginTop: "3vh"}} className="row">
                        {
                            summaryCard.map((item, index) => (
                                <div className="col-6" key={index}>
                                    <StatusCard
                                        icon={item.icon}
                                        count={item.count}
                                        title={item.title}
                                    />
                                </div>
                            ))
                        }
                    </div>
                </div>               
                <div className="col-7">
                    <div className="card full-height">
                    <h5>Growth Rate (in %) this year</h5>
                    <Chart
                        options={chartOptions.options}                        
                        series={chartOptions.series}
                        type='line'
                        height='100%'
                    />
                    </div>
                </div>
                <div className="col-8">
                    <div className='card'>
                        <div className='card__header'>
                            <h3>Portfolio</h3>
                        </div>
                        <div className='card__body'>
                            {/* <Table
                                headData={topCustomers.head}
                                renderHead={(item, index) => renderCusomerHead(item, index)}
                                bodyData={topCustomers.body}
                                renderBody={(item, index) => renderCusomerBody(item, index)}
                            /> */}
                            <div className="ag-theme-alpine" style={{height: 300, width : '100%'}}>
                                <AgGridReact
                                    rowData={usertradingRecord}
                                    columnDefs={colDefsTrading}
                                    animateRows={true} >
                                </AgGridReact>
                            </div>
                        </div>
                        <div className='card__footer'>
                            <Link to='/'>View all</Link>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                            <h3 style={{textAlign: "center"}}>Further readings</h3>
                            <h5 style={{textAlign: "center"}}>This week's key performance indicators</h5>
                            
                            <div style={{  display: "flex", justifyContent: "center"}} className="row">
                            {
                            indicatorCards.map((item, index) => (
                                <div className="col-7" key={index}>
                                    <IndicatorCard
                                        icon={item.icon}
                                        title={item.title}
                                        link={item.link}
                                    />
                                </div>
                            ))
                            }
                    </div>
                </div>
                
                
            </div>
        </div>
    )
}

export default Dashboard



/*
<div className="col-5">
                    <div className="card">
                        <div className="card__header">
                            <h3>Post</h3>
                        </div>
                        <div className="card__body">
                            <div className='row'>
                                <div className="col-12">
                                <img className="photo" src={postImage} alt={"post image"} /> 
                                </div>
                                <div className="col-12">
                                    content content content content content content content 
                                </div>
                                <div className="col-12">
                                    <Badge type="danger" content="Like"/>
                                </div>
                            </div>
                        </div>
                        <div className="card__footer">
                            <Link to='/'>view all</Link>
                        </div>
                    </div>
                </div>

<div className="col-5">
                    <div className='card__header'>
                            <h3>Temp</h3>
                    </div>
                    <div>
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
                        <button onClick={addUser}>Add User</button>
                    </div>
                </div>
*/ 

/*<Chart
    options={chartOptions.options}
    series={chartOptions.series}
    type='line'
    height='100%'
/>*/