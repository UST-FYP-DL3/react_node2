import React, {useEffect, useState} from 'react'
import './Stocks.css';
import { useSelector } from 'react-redux'

import { useAuth } from '../contexts/AuthContext'
import Axios from 'axios'

import { Link } from 'react-router-dom'

import Chart from 'react-apexcharts'
// import Plot from 'react-plotly.js';
import createPlotlyComponent from 'react-plotly.js/factory'
// const Plotly = window.Plotly
// const Plot = createPlotlyComponent(Plotly)

import { Row, Col, Button, InputGroup, FormControl } from 'react-bootstrap'

import Table from '../components/table/Table'

// import 'bootstrap/dist/css/bootstrap.min.css';

// import stockConstituents from '../assets/JsonData/stockConstituents.json'

const topIndicator = {
    head: [
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
    ],
    body: [
        {
            "date": "10 Nov 21",
            "atr": 2.513468,
            "bb_ma": 213.062940,
            "emavg": 216.478291,
            "mom": 2.4600,
            "rsi": 59.948243
        },
        {
            "date": "09 Nov 21",
            "atr": 2.940202,
            "bb_ma": 212.384345,
            "emavg": 216.687436,
            "mom": 0.6500,
            "rsi": 61.758888
        },
        {
            "date": "08 Nov 21",
            "atr": 3.317803,
            "bb_ma": 211.640785,
            "emavg": 216.606154,
            "mom": 3.0200,
            "rsi": 60.116419
        },
        {
            "date": "05 Nov 21",
            "atr": 4.006704,
            "bb_ma": 210.863830,
            "emavg": 217.064231,
            "mom": 7.2500,
            "rsi": 62.014016
        },
    ]
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
        <td>{item.date}</td>
        <td>{item.atr}</td>
        <td>{item.bb_ma}</td>
        <td>{item.emavg}</td>
        <td>{item.mom}</td>
        <td>{item.rsi}</td>
    </tr>
)

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

    const Plotly = window.Plotly
    const Plot = createPlotlyComponent(Plotly)
    
    // date format
    const SystemTIME = '16:30:00'
    const SystemDATE = '2021-11-08' // 
    var currDate = new Date(SystemDATE)
    var yesterdayDate = new Date(SystemDATE);
    yesterdayDate.setDate(currDate.getDate()-1)
    currDate = currDate.toISOString().split('T')[0]
    yesterdayDate = yesterdayDate.toISOString().split('T')[0]

    const defaultStock = 'AMZN'

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

    const [startPlotDate, setstartPlotDate] = useState('2021-01-01') 
    const [endPlotDate, setEndPlotDate] = useState('2021-11-15') 
    const [plotData, setPlotData] = useState([])

    const plotSotckPriceWithDates = (searchSymbolget, startPlotDateget, endPlotDateget) => {
        console.log("enter plotSotckPriceWithDates")
        // console.log(currentUser.uid)
        Axios.post('http://localhost:3001/stockpriceplot', {
            stockSymbol: searchSymbolget,
            startPlotDate: startPlotDateget,
            endPlotDate: endPlotDateget
        }).then( // Axios.get('http://localhost:3001/holdings', {userID: currentUserID})
            (response) => {
                console.log(response.data)
                setPlotData(response.data)
            }
        ); // get request, response contains everything send from the backend
    };

    function clickSearch(searchSymbol) {
        setSearchSymbol(searchSymbol);
        getSingleStockDetails(searchSymbol); 
        getStockCurrPrice(searchSymbol);
        getStockYesterdayPrice(searchSymbol);
        setdisplaySymbol(searchSymbol);
    }

    // when first load the page
    useEffect( () => {
        setSearchSymbol(defaultStock);  // default is ...
        getSingleStockDetails(defaultStock);
        getStockCurrPrice(defaultStock);
        getStockYesterdayPrice(defaultStock);
        plotSotckPriceWithDates(defaultStock, '2021-01-01', '2021-11-15');
      }, []);

    return (
        <div className='row'>
            <div className='col-12'>
                <h2 className='container-div'>Stock Information</h2>
            </div>

            <Row className='justify-content-md-center mt-3'>
                <div className='col-10'>
                    <InputGroup className="mb-3">
                        <FormControl placeholder="Enter Stock Symbol (e.g. AAPL)" onChange={(event)=>{setSearchSymbol(event.target.value)}} />
                        <Button variant="outline-secondary" id="button-addon2" onClick={ () => {clickSearch(searchSymbol) }} >Search</Button>
                    </InputGroup>
                </div>
            </Row>


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
                    <p style ={{marginLeft: "2vh", marginTop: "0vh", fontWeight: "400"}}>At close: {currDate}  {SystemTIME} EST. Market closed</p>
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


                </div>
            </div>








            <div className='col-12'>
                <div style ={{border: "2px solid lightgrey", borderRadius: "10px"}}>
                    
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
                    <div class='col-12'>
                        <iframe width='100%' height="600" frameborder="0" scrolling="no" src="//plotly.com/~fyp21dl3/26.embed"></iframe>
                    </div>
                    <div className="col-12">
                            <div className='card'>
                                <div>
                                    <h3 className='card__header'>Trading indicators</h3>
                                    <h6>Click 
                                        <span style ={{color: "blue", marginLeft: "1vh", marginRight: "1vh"}} class='bx bxs-info-circle'></span>
                                        icon to see the indicator details.
                                    </h6>
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
                    <div className="col-12">
                        <div className='card'>
                            <div>
                                <h3 className='card__header'>Analyst Rating</h3>
                                <h6>Know more about analyst rating: 
                                    <a href="https://www.investopedia.com/financial-edge/0512/understanding-analyst-ratings.aspx" target="_blank" style ={{color: "green", marginLeft: "1vh", marginRight: "1vh"}} class='bx bxs-info-circle'></a>
                                </h6>
                            </div>
                            <div className='card__body'>
                                <Table
                                    headData={topRatings.head}
                                    renderHead={(item, index) => renderRatingHead(item, index)}
                                    bodyData={topRatings.body}
                                    renderBody={(item, index) => renderRatingBody(item, index)}
                                />
                            </div>
                            <div className='card__footer'>
                                <Link to='/'>View all</Link>
                            </div>
                        </div>
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


