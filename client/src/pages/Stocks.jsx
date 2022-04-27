import React, {useEffect, useState} from 'react'
import './Stocks.css';
import { useSelector } from 'react-redux'

import { useAuth } from '../contexts/AuthContext'
import Axios from 'axios'

import { Link } from 'react-router-dom'

import Chart from 'react-apexcharts'
import Plot from 'react-plotly.js';
// import createPlotlyComponent from 'react-plotly.js/factory'
// const Plotly = window.Plotly
// const Plot = createPlotlyComponent(Plotly)

// import Plotly from "plotly.js-basic-dist-min";
// import createPlotlyComponent from "react-plotly.js/factory";
// const Plot = createPlotlyComponent(Plotly);

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Row, Col, Button, InputGroup, FormControl, Card } from 'react-bootstrap'

import Table from '../components/table/Table'
import { getContrastRatio } from '@mui/material';

// import 'bootstrap/dist/css/bootstrap.min.css';

import stockConstituents from '../assets/JsonData/stockConstituents.json'

import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import SearchBar from '../components/searchBar/SearchBar'

const topRatings = {
    head: [ 'Date', 'Analyst', 'Action', 'Rating'],
    body: [
        {
            "date": "29 Oct 21",
            "analyst": "Morgan Stanley",
            "action": "Mantains",
            "rating": "Overweight"
        },
        {
            "date": "29 Oct 21",
            "analyst": "Barclays",
            "action": "Mantains",
            "rating": "Equal-weight"
        },
        {
            "date": "29 Oct 21",
            "analyst": "Oppenheimer",
            "action": "Mantains",
            "rating": "Outperform"
        },
        {
            "date": "27 Oct 21",
            "analyst": "Morgan Stanley",
            "action": "Mantains",
            "rating": "Overweight"
        },
    ]
}

const renderRatingHead = (item, index) => (
    <th style ={{textAlign: "center"}} key={index}>{item}</th>
)

const renderRatingBody = (item, index) => (
    <tr style ={{textAlign: "center"}} key={index}>
        <td>{item.date}</td>
        <td>{item.analyst}</td>
        <td>{item.action}</td>
        <td>{item.rating}</td>
    </tr>
)

function Stocks(props) {

    // const Plot = createPlotlyComponent(Plotly);
    
    // date format
    const SystemCurrTIME = '16:30:00'
    const SystemCurrDATE = '2021-11-08' // one date later for difference between date in res.send and mysql
    const SystemEndPredDATE = '2021-11-15'
    var currDate = new Date(SystemCurrDATE)
    // var yesterdayDate = new Date(SystemDATE)
    // yesterdayDate.setDate(currDate.getDate()-1)
    var endPredDate = new Date(SystemEndPredDATE);
    
    currDate = currDate.toISOString().split('T')[0]
    // yesterdayDate = yesterdayDate.toISOString().split('T')[0]
    endPredDate = endPredDate.toISOString().split('T')[0]

    // console.log(currDate)
    // console.log(yesterdayDate)
    // console.log(endPredDate)


    const defaultStock = 'MSFT'

    const { currentUser } = useAuth()
    const userID = currentUser.uid // ZtGPo16e7rdc3lt0m4xGAK8PsB03

    const [searchSymbol, setSearchSymbol] = useState(null)
    const [searchCompany, setSearchCompany] = useState(null)
    const [searchSector, setSearchSector] = useState(null)

    const [displaySymbol, setdisplaySymbol] = useState(defaultStock)

    const getSingleStockDetails = (searchSymbolget) => {
        // console.log(currentUser.uid)
        Axios.get(`http://localhost:3001/singlestockdetails${searchSymbolget}`).then( // Axios.get('http://localhost:3001/holdings', {userID: currentUserID})
            (response) => {
                // console.log(currentUser.uid)
                console.log(response.data)
                // console.log(response.data[0].stockname)
                // console.log(response.data[0].stocksector)
                setSearchCompany(response.data[0].stockname)
                setSearchSector(response.data[0].stocksector) // response has a propert call data
                // setSumOfCost(response.data.map( (value, key) => (value.cost)).reduce( (accumulator, currentValue) => {return accumulator + currentValue}))
            }
        ); // get request, response contains everything send from the backend
    };

    const [currPrice, setCurrPrice] = useState(0)
    const [yesterdayPrice, setYesterdayPrice] = useState(0)
    
    const getStockCurrPrice = (searchSymbolget) => {
        // console.log(currentUser.uid)
        Axios.post('http://localhost:3001/stockcurrprice', {
            stockSymbol: searchSymbolget,
            currDate: currDate,
        }).then( // Axios.get('http://localhost:3001/holdings', {userID: currentUserID})
            (response) => {
                // console.log(currentUser.uid)
                console.log(response.data)
                // console.log(response.data[0].CLOSE)
                setCurrPrice(response.data[0].CLOSE)
                // setSumOfCost(response.data.map( (value, key) => (value.cost)).reduce( (accumulator, currentValue) => {return accumulator + currentValue}))
            }
        ); // get request, response contains everything send from the backend
    };

    const getStockYesterdayPrice = (searchSymbolget) => {
        // console.log(currentUser.uid)
        Axios.post('http://localhost:3001/stockyesterdayprice', {
            stockSymbol: searchSymbolget,
            currDate: currDate,
        }).then( // Axios.get('http://localhost:3001/holdings', {userID: currentUserID})
            (response) => {
                console.log(response.data)
                setYesterdayPrice(response.data[0].CLOSE)
            }
        ); // get request, response contains everything send from the backend
    };

    const [startPlotDate, setStartPlotDate] = useState(new Date('2020-12-31')) 
    const [endPlotDate, setEndPlotDate] = useState(new Date('2021-11-15')) 
    const [plotData, setPlotData] = useState([])

    const getSotckPriceWithDates = (searchSymbolget, startPlotDateget, endPlotDateget) => {
        // console.log("enter plotSotckPriceWithDates")
        // console.log(currentUser.uid)
        Axios.post('http://localhost:3001/stockpriceplot', {
            stockSymbol: searchSymbolget,
            startPlotDate: startPlotDateget,
            endPlotDate: endPlotDateget,
        }).then( // Axios.get('http://localhost:3001/holdings', {userID: currentUserID})
            (response) => {
                console.log(response.data)
                setPlotData(response.data)
            }
        ); // get request, response contains everything send from the backend
    };

    const chartPricePlotly = {
        data: [
        {
            x: plotData != null ? plotData.map((value, key) => value.Date) : [], // [1, 2, 3],
            y: plotData != null ? plotData.map((value, key) => value.CLOSE) : [],
            type: 'line',
            mode: 'lines+markers',
            marker: {color: 'light blue'},
        }],
        layout: {
            title: `Stock Price of ${displaySymbol}`,
            xaxis: {title: "Date"},
            yaxis: {title: "Price"},
            shapes: [{
                type: 'line',
                name: 'Today',
                x0: currDate,
                x1: currDate,
                y0: 0,
                y1: 1,
                yref: 'paper',
                line: {
                    color: 'grey',
                }
            }]
        }
    }

    const [withPred, setWithPred] = useState(true)

    const chartPricePlotlyCandlewithPred = {
        data: [
        {
            x: plotData != null ? plotData.map((value, key) => value.Date ) : [], // [1, 2, 3],
            close: plotData != null ? plotData.map((value, key) => value.CLOSE) : [],
            high: plotData != null ? plotData.map((value, key) => value.HIGH) : [],
            low: plotData != null ? plotData.map((value, key) => value.LOW) : [],
            open: plotData != null ? plotData.map((value, key) => value.OPEN) : [],
            
            decreasing: {line: {color: 'green'}},
            decreasing: {line: {color: 'red'}},

            type: 'candlestick',
            xaxis: 'x',
            yaxis: 'y'
        }],
        layout: {
            title: `Stock Price of ${displaySymbol}`,
            dragmode: 'zoom',  
            showlegend: false, 
            xaxis: {
                title: "Date",
                autorange: true, 
                // domain: [0, 1], 
                range: [startPlotDate, endPlotDate], 
                rangeslider: {visible: false}, 
                type: 'date'
            }, 
            yaxis: {
                title: "Price",
                autorange: true, 
                // domain: [0, 1], 
                // range: [114.609999778, 137.410004222], 
                type: 'linear'
            },
            // xaxis: {title: "Date"},
            // yaxis: {title: "Price"},
            shapes: [ {
                type: 'rect',
                xref: 'x',
                yref: 'paper',
                x0: currDate,
                y0: 0,
                x1: endPredDate,
                y1: 1,
                fillcolor: '#d3d3d3',
                opacity: 0.5,
                line: { width: 0 }
            },
            {
                type: 'line',
                x0: currDate,
                x1: currDate,
                y0: 0,
                y1: 1,
                yref: 'paper',
                line: {
                    color: 'grey',
                    opacity: 0.5
                }
            } ],
            annotations: [ {
                x: currDate,
                y: 0.95,
                xref: 'x',
                yref: 'paper',
                text: 'prediction',
                font: {color: 'blue'},
                showarrow: true,
                xanchor: 'right',
                ax: -15,
                ay: 0
            },
            {
                x: currDate,
                y: 1,
                xref: 'x',
                yref: 'paper',
                text: 'Today',
                font: {color: 'black'},
                showarrow: true,
                // xanchor: 'down',
                ax: 0,
                ay: -5
            } ],
        }
    }

    const chartPricePlotlyCandleNoPred = {
        data: [
        {
            x: plotData != null ? plotData.map((value, key) => value.Date ) : [], // [1, 2, 3],
            close: plotData != null ? plotData.map((value, key) => value.CLOSE) : [],
            high: plotData != null ? plotData.map((value, key) => value.HIGH) : [],
            low: plotData != null ? plotData.map((value, key) => value.LOW) : [],
            open: plotData != null ? plotData.map((value, key) => value.OPEN) : [],
            
            decreasing: {line: {color: 'green'}},
            decreasing: {line: {color: 'red'}},

            type: 'candlestick',
            xaxis: 'x',
            yaxis: 'y'
        }],
        layout: {
            title: `Stock Price of ${displaySymbol}`,
            dragmode: 'zoom',  
            showlegend: false, 
            xaxis: {
                title: "Date",
                autorange: true, 
                // domain: [0, 1], 
                range: [startPlotDate, endPlotDate], 
                rangeslider: {visible: false}, 
                type: 'date'
            }, 
            yaxis: {
                title: "Price",
                autorange: true, 
                // domain: [0, 1], 
                // range: [114.609999778, 137.410004222], 
                type: 'linear'
            },
        }
    }

    const chartPriceApex = {
        series: [{
            name: displaySymbol,
            data: plotData != null ? plotData.map((value, key) => value.CLOSE) : [],
        }],
        options: {
            chart: {
                type: 'area',
                stacked: false,
                height: 350,
                zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
                },
                toolbar: {
                    autoSelected: 'zoom'
                }
            },
            forecastDataPoints: {
                count: 5
            },
            dataLabels: {
                enabled: false
            },
            markers: {
                size: 0,
            },
            title: {
                text: `Stock Price of ${displaySymbol}`,
                align: 'center',
                style: {
                    fontSize: '20px',
                    fontWeight: '',
                },
            },
            yaxis: {
                labels: {
                    formatter: function (val) { return (val).toFixed(4); },
                },
                title: { 
                    text: 'Price',
                    style: {
                        fontSize: '15px',
                        fontWeight: '',
                    }
                },
            },
            xaxis: {
                categories: plotData != null ? plotData.map((value, key) => value.Date) : [],
                title: { 
                    text: "Date",
                    style: {
                        fontSize: '15px',
                        fontWeight: '',
                    }
                },
                type: 'datetime',
            },
            tooltip: {
                shared: false,
                y: {
                formatter: function (val) { return val.toFixed(4) }
                }
            },
            stroke: {
                width: 2
            },
            markers: {
                size: 3
            },
            annotations: {
                xaxis: [{
                    x: new Date(currDate).getTime(),
                    x2: null,
                    strokeDashArray: 0,
                    borderColor: '#555b65',
                    label: {
                        borderColor: '#555b65',
                        style: {
                          color: '#fff',
                          background: '#555b65',
                        },
                        text: 'Today',
                    }
                },
                {
                    x: new Date(currDate).getTime(),
                    x2: new Date('2021-11-15').getTime(),
                    strokeDashArray: 1,
                    borderColor: '#555b65',
                    width: '300%',
                    label: {
                        borderColor: '#555b65',
                        orientation: 'horizontal',
                        textAnchor: 'middle',
                        style: {
                          color: '#fff',
                          background: '#555b65',
                        },
                        text: 'Prediction',
                    }
                }, ]
            },
        },
    };

    const [startInputDate, setStartInputDate] = useState(new Date('2020-12-31'));
    const [endInputDate, setEndInputDate] = useState(new Date('2021-11-15'));

    function clickDateSearch(searchSymbol) {

        setStartPlotDate(startInputDate);
        setEndPlotDate(endInputDate);

        setWithPred( (endPlotDate > currDate || endInputDate > currDate)? true : false);

        getSotckPriceWithDates(searchSymbol, startInputDate, endInputDate);
    }


    const renderIndicatorHead = (item, index) => (
        <th style ={{textAlign: "center"}} key={index}>
            {item.item}
            <a href = {item.website} style ={{color: "blue", marginLeft: "2vh"}} target="_blank" class='bx bxs-info-circle'>
            </a>
        </th>
    )

    const renderIndicatorBody = (item, index) => (
        <tr style ={{textAlign: "center"}} key={index}>
            <td>{item.Date}</td>
            <td>{item.ATR}</td>
            <td>{item.BB_MA}</td>
            <td>{item.EMAVG}</td>
            <td>{item.MOM}</td>
            <td>{item.RSI}</td>
        </tr>
    )

    const [startIndicatorDate, setStartIndicatorDate] = useState(new Date('2021-09-30')) 
    const [endIndicatorDate, setEndIndicatorDate] = useState(new Date('2021-11-08')) 
    const [indicatorData, setIndicatorData] = useState([])

    // for select the date
    const [startInputDateIndicator, setstartInputDateIndicator] = useState(new Date('2021-09-30'));
    const [endInputDateIndicator, setendInputDateIndicator] = useState(new Date('2021-11-08'));

    
    const getIndicatorWithDates = (searchSymbolget, startIndicatorDateget, endIndicatorDateget) => {
        // console.log("enter plotSotckPriceWithDates")
        // console.log(currentUser.uid)
        Axios.post('http://localhost:3001/stocktradingindicators', {
            stockSymbol: searchSymbolget,
            startIndicatorDate: startIndicatorDateget,
            endIndicatorDate: endIndicatorDateget,
        }).then( // Axios.get('http://localhost:3001/holdings', {userID: currentUserID})
            (response) => {
                console.log("getIndicatorWithDates, indicatorData:")
                console.log(response.data);
                setIndicatorData(response.data);
                // setrowDataIndicator(response.data);
            }
        ) // get request, response contains everything send from the backend
    };
    
    function clickIndicatorSearch(searchSymbol) {

        setStartIndicatorDate(startInputDateIndicator);
        setEndIndicatorDate(endInputDateIndicator);

        getIndicatorWithDates(searchSymbol, startInputDateIndicator, endInputDateIndicator);

    }


    
    // overall search
    function clickSymbolSearch(searchSymbol) {
        setSearchSymbol(searchSymbol);
        getSingleStockDetails(searchSymbol); 
        getStockCurrPrice(searchSymbol);
        getStockYesterdayPrice(searchSymbol);
        setdisplaySymbol(searchSymbol);
        getSotckPriceWithDates(searchSymbol, startPlotDate, endPlotDate);
        getIndicatorWithDates(searchSymbol, startIndicatorDate, endIndicatorDate);
        getRatingWithDates(searchSymbol, startRatingDate, endRatingDate);
    }

    const topIndicatorHeader = [
        {
            "item": 'Date',
            "website": 'https://www.investopedia.com/terms/i/investment_horizon.asp#:~:text=An%20investment%20horizon%20refers%20to%20the%20length%20of,has%20a%20long-term%20investment%20horizon%20and%20is%20risk-averse.'
        },
        {
            "item": 'ATR',
            "website": 'https://www.investopedia.com/terms/a/atr.asp'
        },
        {
            "item": 'BB_MA',
            "website": 'https://www.investopedia.com/articles/technical/102201.asp'
        },
        {
            "item": 'EMAVG',
            "website": 'https://www.investopedia.com/ask/answers/122314/what-exponential-moving-average-ema-formula-and-how-ema-calculated.asp#:~:text=The%20exponential%20moving%20average%20%28EMA%29%20is%20a%20technical,more%20weighting%20or%20importance%20to%20recent%20price%20data.'
        },
        {
            "item": 'MOM',
            "website": 'https://www.investopedia.com/terms/m/momentum.asp'
        },
        {
            "item": 'RSI',
            "website": 'https://www.investopedia.com/terms/r/rsi.asp'
        }
    ]    

    // when first load the page
    useEffect( () => {
        setSearchSymbol(defaultStock);  // default is ...
        getSingleStockDetails(defaultStock);
        getStockCurrPrice(defaultStock);
        getStockYesterdayPrice(defaultStock);
        getSotckPriceWithDates(defaultStock, startPlotDate, endPlotDate);
        getIndicatorWithDates(defaultStock, startIndicatorDate, endIndicatorDate);
        getRatingWithDates(defaultStock, startRatingDate, endRatingDate);
    }, []);

    const indicatorHeaderLink = {
        "Date": 'https://www.investopedia.com/terms/i/investment_horizon.asp#:~:text=An%20investment%20horizon%20refers%20to%20the%20length%20of,has%20a%20long-term%20investment%20horizon%20and%20is%20risk-averse.',
        "ATR": 'https://www.investopedia.com/terms/a/atr.asp',
        "ROC" : 'https://www.investopedia.com/terms/p/pricerateofchange.asp',
        "EMAVG": 'https://www.investopedia.com/ask/answers/122314/what-exponential-moving-average-ema-formula-and-how-ema-calculated.asp#:~:text=The%20exponential%20moving%20average%20%28EMA%29%20is%20a%20technical,more%20weighting%20or%20importance%20to%20recent%20price%20data.',
        "MOM": 'https://www.investopedia.com/terms/m/momentum.asp',
        "RSI": 'https://www.investopedia.com/terms/r/rsi.asp',
    }

    // const [rowDataIndicator, setrowDataIndicator] = useState([]);
    const [colDefsIndicator, setcolDefsIndicator] = useState([
        { field: 'Date', sortable: true, filter: true, headerComponentParams: {template: '<div class="ag-cell-label-container" role="presentation">' +
        '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
        '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
        '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
        '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
        '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
        '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
        `    <div>Date<a href = ${indicatorHeaderLink.Date} target='_blank' class='bx bxs-info-circle'></a></div>` +
        '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
        '  </div>' +
        '</div>' } },
        { field: 'ATR', sortable: true, filter: true, headerComponentParams: { template: '<div class="ag-cell-label-container" role="presentation">' +
        '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
        '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
        '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
        '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
        '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
        '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
        `    <div>ATR<a href = ${indicatorHeaderLink.ATR} target='_blank' class='bx bxs-info-circle'></a></div>` +
        '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
        '  </div>' +
        '</div>' } },
        { field: 'ROC', sortable: true, filter: true, headerComponentParams: { template: '<div class="ag-cell-label-container" role="presentation">' +
        '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
        '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
        '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
        '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
        '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
        '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
        `    <div>ROC<a href = ${indicatorHeaderLink.ROC} target='_blank' class='bx bxs-info-circle'></a></div>` +
        '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
        '  </div>' +
        '</div>' } },
        { field: 'EMAVG', sortable: true, filter: true, headerComponentParams: { template: '<div class="ag-cell-label-container" role="presentation">' +
        '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
        '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
        '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
        '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
        '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
        '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
        `    <div>EMAVG<a href = ${indicatorHeaderLink.EMAVG} target='_blank' class='bx bxs-info-circle'></a></div>` +
        '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
        '  </div>' +
        '</div>' } },
        { field: 'MOM', sortable: true, filter: true, headerComponentParams: { template: '<div class="ag-cell-label-container" role="presentation">' +
        '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
        '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
        '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
        '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
        '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
        '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
        `    <div>MOM<a href = ${indicatorHeaderLink.MOM} target='_blank' class='bx bxs-info-circle'></a></div>` +
        '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
        '  </div>' +
        '</div>' } },
        { field: 'RSI', sortable: true, filter: true, headerComponentParams: { template: '<div class="ag-cell-label-container" role="presentation">' +
        '  <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>' +
        '  <div ref="eLabel" class="ag-header-cell-label" role="presentation">' +
        '    <span ref="eSortOrder" class="ag-header-icon ag-sort-order"></span>' +
        '    <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon"></span>' +
        '    <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon"></span>' +
        '    <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon"></span>' +
        `    <div>RSI<a href = ${indicatorHeaderLink.RSI} target='_blank' class='bx bxs-info-circle'></a></div>` +
        '    <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>' +
        '  </div>' +
        '</div>' } },
    ])

    const [startRatingDate, setStartRatingDate] = useState(new Date('2021-09-30')) 
    const [endRatingDate, setEndRatingDate] = useState(new Date('2021-11-08')) 
    const [ratingData, setRatingData] = useState([])

    const [colDefsRating, setcolDefsRating] = useState([
        { field: 'Date', sortable: true, filter: true },
        { field: 'Analyst', sortable: true, filter: true },
        { field: 'Action', sortable: true, filter: true },
        { field: 'Rating', sortable: true, filter: true },
    ])

    const getRatingWithDates = (searchSymbolget, startRatingDateget, endRatingDateget) => {
        // console.log("enter plotSotckPriceWithDates")
        // console.log(currentUser.uid)
        Axios.post('http://localhost:3001/stockanalystratings', {
            stockSymbol: searchSymbolget,
            startRatingDate: startRatingDateget,
            endRatingDate: endRatingDateget,
        }).then( // Axios.get('http://localhost:3001/holdings', {userID: currentUserID})
            (response) => {
                console.log("getRatingWithDates, ratingData:")
                console.log(response.data);
                setRatingData(response.data);
                // setrowDataIndicator(response.data);
            }
        ) // get request, response contains everything send from the backend
    };



    return (
        <div className='row'>
            <div className='col-12'>
                <h2 className='container-div'>Stock Information</h2>
            </div>

            <Row className='mt-3 mb-3'>
                <div className='col-12 mb-3'>
                    {/* <InputGroup>
                        <FormControl placeholder="Enter Stock Symbol (e.g. MSFT)" onChange={(event)=>{setSearchSymbol(event.target.value)}} />
                        <Button variant="outline-secondary" id="button-addon2" onClick={ () => {clickSymbolSearch(searchSymbol) }} >Search</Button>
                        <Button variant="outline-secondary" id="button-addon2" onClick={ () => {clickSymbolSearch(searchSymbol) }} >Search</Button>                        
                    </InputGroup> */}
                    <SearchBar placeholder="Stock Symbol or Name (e.g. MSFT)" data={stockConstituents} searching={searchResult => setSearchSymbol(searchResult)}/>
                </div>
                {/* <Button variant="outline-secondary" id="button-addon2" onClick={ () => {clickSymbolSearch(searchSymbol) }} >Search</Button> */}
                <div className='col-12'>
                    <Button variant="secondary mx-2" id="button-addon2" onClick={ () => {clickSymbolSearch(searchSymbol) }} >Search</Button>
                </div>
                
            </Row>

            {/* <Row className='justify-content-md-center mt-3'>
                <SearchBar placeholder="Search" data={stockConstituents} />
            </Row> */}


            <div className='col-12'>
                <div className='card'>
                    <h2>{searchCompany != null? searchCompany : <span></span> }&nbsp;({displaySymbol != null? displaySymbol : <span></span> })</h2>                 
                    <span style ={{marginTop: "1vh"}}>Sector: {searchSector != null? searchSector : <div></div> }</span>
                    <hr />
                    <h2 style ={{fontWeight: "700", marginLeft: "2vh"}}>{currPrice.toFixed(2)}</h2>
                    <p style ={{color: currPrice >= yesterdayPrice ? "green" : "red", margin: "2vh", marginTop: "0vh", marginBottom: "0vh", fontWeight: "400"}}>
                        {yesterdayPrice.toFixed(2)}&nbsp;
                        {currPrice >= yesterdayPrice ? ( <span><i class='bx bxs-up-arrow' /> {(currPrice - yesterdayPrice).toFixed(2)} </span>) : (<span><i class='bx bxs-down-arrow' /> {(yesterdayPrice - currPrice).toFixed(2)} </span>) }
                        &nbsp;({((currPrice/yesterdayPrice-1)*100).toFixed(2)}%)</p>                   
                    <p style ={{marginLeft: "2vh", marginTop: "0vh", fontWeight: "400"}}>At close: {currDate}  {SystemCurrTIME} EST. Market closed</p>
                    <div style ={{display: "inline-block"}}>
                        <button class="button-star" role="button" style={{marginTop: '0vh'}}>
                            <i style ={{color: "#ffbf00", float: "right", clear: "right"}} class='bx bxs-star' />
                            <text style ={{margin: "1vh",color: "#696969"}}>Save To Watchlist</text>
                        </button>
                    </div>
                </div>
            </div>

            <div className='col-12'>
                <div className='card'>                   
                    <Row className='justify-content-center'>
                        <div className='col-4'>
                            <span>Choose Start Date: (From 2015-05-31)</span>
                            <DatePicker dateFormat="yyyy-MM-dd" selected={startInputDate} onChange={(date) => setStartInputDate(date)}/>
                        </div>
                        <div className='col-4'>
                            <span>Choose End Date: (To 2021-11-15)</span>
                            <DatePicker dateFormat="yyyy-MM-dd" selected={endInputDate} onChange={(date) => setEndInputDate(date)}/>
                        </div>
                        <div className='col-1'>
                            <Button variant='secondary' onClick={ () => {clickDateSearch(searchSymbol) }}>
                                Search
                            </Button>
                        </div>
                        <div className='col-6'>
                            
                        </div>
                    </Row>
                    <hr />
                    {/* <Plot
                        data={chartPricePlotly.data}
                        layout={chartPricePlotly.layout}
                    />
                    <Chart
                        series={chartPriceApex.series}
                        options={chartPriceApex.options}                        
                        type='line'
                        height='500'
                    /> */}
                    <Plot
                        data={chartPricePlotlyCandlewithPred.data}
                        layout={chartPricePlotlyCandlewithPred.layout}
                    />
                </div>
            </div>

            <div className='col-12'>
                <div className='card'>
                    <div className='card__header'>
                        <h3>Trading indicators</h3>
                        <h6>Click 
                            <span style ={{color: "blue", marginLeft: "1vh", marginRight: "1vh"}} class='bx bxs-info-circle'></span>
                            icon to see the indicator details.
                        </h6>
                    </div>

                    <Row className='justify-content-center'>
                        <div className='col-4'>
                            <span>Choose Start Date: (From 2021-09-30)</span>
                            <DatePicker dateFormat="yyyy-MM-dd" selected={startInputDateIndicator} onChange={(date) => setstartInputDateIndicator(date)}/>
                        </div>
                        <div className='col-4'>
                            <span>Choose End Date: (To 2021-11-15)</span>
                            <DatePicker dateFormat="yyyy-MM-dd" selected={endInputDateIndicator} onChange={(date) => setendInputDateIndicator(date)}/>
                        </div>
                        <div className='col-1'>
                            <Button variant='secondary' onClick={ () => {clickIndicatorSearch(searchSymbol) }}>
                                Search
                            </Button>
                        </div>
                    </Row>

                    <div className="ag-theme-alpine" style={{height: 400, width : '100%'}}>
                        <AgGridReact
                            rowData={indicatorData}
                            columnDefs={colDefsIndicator}
                            animateRows={true} >
                        </AgGridReact>
                    </div>

                </div>
            </div>

            <div className='col-12'>
                <div className='card'>
                    <div className='card__header'>
                        <h3>Analyst Ratings</h3>
                        <h6>Know more about analyst rating: 
                            <a href="https://www.investopedia.com/financial-edge/0512/understanding-analyst-ratings.aspx" target="_blank" style ={{color: "green", marginLeft: "1vh", marginRight: "1vh"}} class='bx bxs-info-circle'></a>
                        </h6>
                    </div>

                    <div className="ag-theme-alpine" style={{height: 400, width : '100%'}}>
                        <AgGridReact
                            rowData={ratingData}
                            columnDefs={colDefsRating}
                            animateRows={true} >
                        </AgGridReact>
                    </div>

                </div>
            </div>


        </div>  // the return <div className='row'>      
    )
}

export default Stocks

{/* <div>
    <h2 className='container-div'>Stock History</h2>
    <h5>Apple Inc.</h5>
    <span>NasdaqGS: AAPL</span>
    <div className='row'>
        <div className='col-8'>
            <div className='card full-height'>
                <iframe height="600" frameborder="0" scrolling="no" src="//plotly.com/~fyp21dl3/26.embed"></iframe>
            </div>
        </div>
        <div className='col-4'>
            <div className='card full-height'>
                <div className='card__header'>
                    <h3>Indicator</h3>
                </div>
                <div className='card__body'>
                    <label>Ind 1: </label>
                    <label>Ind 2: </label>
                    <label>Ind 3: </label>
                </div>
            </div>
        </div>
    </div>
</div> */
/*           <div>
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
                    height='200%'
                />
            </div>
                */}


