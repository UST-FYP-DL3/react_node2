import React, {useEffect, useState} from 'react'
import{ useRef } from "react"
import { useAuth } from "../../contexts/AuthContext"
import Axios from 'axios'


import Chart from 'react-apexcharts'

import './portfolioTabs.css'

import 'bootstrap/dist/css/bootstrap.min.css';

import Table from '../table/Table'

// import PortfolioTab2 from './PortfolioTab2'

import corrWeek45Data from '../../assets/JsonData/correlationWeek45.json'

import { render } from 'react-dom';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

// // import portfolioWeek44 from '../../assets/JsonData/PortfolioWeek44.json'
// // import portfolioWeek45 from '../../assets/JsonData/PortfolioWeek45.json'
// // import corrPortfolioWeek45 from '../../assets/JsonData/correlationWeek45.json'

// // import Chart from "react-apexcharts";

// // tutorial
// // https://www.youtube.com/watch?v=WkREeDy2WQ4; https://mui.com/material-ui/react-tabs/
// // https://www.youtube.com/watch?v=mhjbACbSeSU; https://mui.com/material-ui/react-tabs/

// //export function useAuth() {
// //  return useContext(AuthContext)
// //}



// // import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// // import { Pie, Doughnut } from 'react-chartjs-2';

// // ChartJS.register(ArcElement, Tooltip, Legend);


// function Tabs() {
//     const { currentUser } = useAuth()
//     const userID = currentUser.uid // ZtGPo16e7rdc3lt0m4xGAK8PsB03

//     // userHoldings store all data
//     const [userHoldings, setUserHoldings] = useState([]); // this is a list
//     const [sumOfCost, setSumOfCost] = useState(0)

//     const getHoldings = (userID) => {
//         // console.log(currentUser.uid)
//         Axios.get(`http://localhost:3001/holdings${userID}`).then( // Axios.get('http://localhost:3001/holdings', {userID: currentUserID})
//             (response) => {
//                 // console.log(currentUser.uid)
//                 console.log(response.data)
//                 setUserHoldings(response.data) // response has a propert call data
//                 setSumOfCost(response.data.map( (value, key) => (value.cost)).reduce( (accumulator, currentValue) => {return accumulator + currentValue}))
//             }
//         ); // get request, response contains everything send from the backend
//     };
//       //, {userID: currentUser.uid} // , {userID: 'ZtGPo16e7rdc3lt0m4xGAK8PsB03'}

//     useEffect( () => {
//       getHoldings(userID);
//     }, []);

//     // const [holdingData, setholdingData] = useState([]);

//     const [toggleState, setToggleState] = useState(1);
       
//     const toggleTab = (index) => {
//       setToggleState(index);
//     };
    
//     function tab1ClickwithData(index, userID) {
//       toggleTab(index);
//       // getHoldings(userID);
//     }

//     function tab2ClickwithData(index, userID) {
//       toggleTab(index);
//       // getHoldings(userID);
//     }

//     // const holdingsDistributionData = {
//     //   labels: userHoldings.map( (value, key) => (value.stock) ), // labels for data
//     //   dataset: [{
//     //     label: 'Holdings Distribution in terms of cost', // title of the chart
//     //     data: userHoldings.map( (value, key) => (value.cost) ),
//     //     backgroundColor: [
//     //       'rgb(255, 99, 132)',
//     //       'rgb(54, 162, 235)',
//     //       'rgb(255, 205, 86)',
//     //       'rgb(255, 205, 86)',
//     //       'rgb(255, 205, 86)'
//     //     ],
//     //   }]
//     // };

//     // try to label the total value
//     var StockNameWk44 = ["ABMD", "CZR", "DPZ", "DXCM", "EXR", "LDOS", "MKTX", 
//                                 "MRNA", "MSCI", "NFLX", "NOC", "NVDA", "ODFL", "POOL", "TMUS"]
//     var StockShareWk44 = [1, 2, 3, 1, 7, 1, 1, 4, 1, 2, 1, 5, 2, 1, 1]
//     var StockPriceWk44 = [359.75, 105.3, 496.67, 637.09, 197.43, 95.82, 390.06, 
//                           244.68, 652.7685, 651.45, 363.27, 308.04, 351.45, 519.7799, 120.86]
//                           // change to 2021-11-05 close price, not yet change
//                           // if change remove this comment
//     var StockValueWk44 = []
//     for (var i = 0; i < StockShareWk44.length; i++) {
//       StockValueWk44[i] = StockShareWk44[i]*StockPriceWk44[i]
//     }
//     var totalValueWk44 = StockValueWk44.reduce( (accumulator, currentValue) => {return accumulator+currentValue} )

//     const currValue = {
//       series: StockValueWk44, // StockValueWk44, // userHoldings.map( (value, key) => (value.cost) ),
//       chartOptions: {
//         labels: StockNameWk44,// StockNameWk44, // userHoldings.map( (value, key) => (value.stock) ),
//         chart: {
//           type: 'dount',
//         },
//         plotOptions: {
//           pie: {
//             dount: {
//               labels: {
//                 show: true,
//                 total: {
//                 show: true,
//                 showAlways: true,
//                 },
//               },
//             },
//           },
//         }, 
//       },        
//     }

//     const currIndustry = {
//       series: [1957, 1233, 1986, 976, 354],
//       chartOptions: {
//         labels: ['Finance', 'FCMG', 'Tech', 'Ind 1', 'Ind 2'],
//         chart: {
//           type: 'dount',
//         },
//         plotOptions: {
//           pie: {
//             dount: {
//               labels: {
//                 show: true,
//                 total: {
//                 show: true,
//                 showAlways: true,
//                 },
//               },
//             },
//           },
//         }, 
//       },        
//     }
    
//     var StockNameWk45 = ["ABMD", "CZR", "DPZ", "DXCM", "EXR", "LDOS", "LLY", 
//                                 "MKTX", "MRNA", "MSCI", "NFLX", "NVDA", "ODFL", "POOL"]
//     var StockShareWk45 = [1, 2, 3, 1, 7, 2, 1, 1, 4, 1, 1, 5, 3, 1]
//     var StockPricePredWk45 = [364.71560, 107.213300, 501.98077, 627.79380, 195.39474, 96.085526, 263.89730,
//                               393.45030, 244.98958, 659.07855, 220.73108, 655.76930, 291.66815, 348.09146, 519.73720]
//     var StockValuePredWk45 = []
//     for (var i = 0; i < StockShareWk45.length; i++) {
//       StockValuePredWk45[i] = StockShareWk45[i]*StockPricePredWk45[i]
//     }
//     var totalValueWk45 = StockValuePredWk45.reduce( (accumulator, currentValue) => {return accumulator+currentValue} )
    
//     const predValue = {
//       series: StockValuePredWk45, // userHoldings.map( (value, key) => (value.cost) ),
//       chartOptions: {
//         labels: StockNameWk45, // userHoldings.map( (value, key) => (value.stock) ),
//         chart: {
//           type: 'dount',
//         },
//         plotOptions: {
//           pie: {
//             dount: {
//               labels: {
//                 show: true,
//                 total: {
//                 show: true,
//                 showAlways: true,
//                 },
//               },
//             },
//           },
//         }, 
//       },        
//     }
    

//     // const [sumOfCost, setSumOfCost] = useState(0)
//     //  const sumCost = userHoldings.map( (value, key) => (value.cost) ).reduce( (accumulator, currentValue) => {return accumulator + currentValue})
    
//     // let cost = userHoldings.map( (value, key) => (value.cost) )
//     // let sumOfCost = cost.reduce( (accumulator, currentValue) => {return accumulator + currentValue})
    
//     // for plot charts
//     const [chart1StockName, setchart1StockName] = useState('')

//     // const plotChart1 = (chart1StockName) => {
//     //   // console.log(currentUser.uid)
//     //   Axios.get(`http://localhost:3001/stockPredChart1${chart1StockName}`).then( // Axios.get('http://localhost:3001/holdings', {userID: currentUserID})
//     //       (response) => {
//     //           // console.log(currentUser.uid)
//     //           console.log(response.data)
//     //           // setUserHoldings(response.data) // response has a propert call data
//     //       }
//     //   ); // get request, response contains everything send from the backend
//     // };

//     // head for Details
//     // const detailsTableHead = ['Stock', 'Quantity', 'Buy At', 'Cost', 'Curr Price', 'Value', 'Profit', '% Change']

//     const tradingTableHead = ['Date', 'Stock', 'B / S', 'Quantity', 'Cost', 'P / L']

//     const renderTableHead = (item, index) => (
//       <th key={index}>{item}</th>
//     )

//     // const detailsTableBody = 

//     const renderTableBody = (item, index) => (
//       <tr key={index}>
//           <td>{item.stock}</td>
//           <td>{item.quantity}</td>
//           <td>{item.buyPrice}</td>
//           <td>{item.cost}</td>
//       </tr>
//     )
  
//     return (
//       <div>
//         <div className="bloc-tabs">
//             <button className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={() => tab1ClickwithData(1, userID)}>
//                 Current (This week)
//             </button>
//             <button className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={() => tab2ClickwithData(2, userID)}>
//                 Recommend (Next Week)
//             </button>
//         </div>

//         <div className="content-tabs">
//           <div className={toggleState === 1 ? "content  active-content" : "content"}>

          // <div className="row">
          //       <div className="col-4">
          //           <div className='card full-height'>
          //             <h5>Total Value: ${totalValueWk44.toFixed(2)}</h5>
          //             <Chart options={currValue.chartOptions} series={currValue.series} type='donut' />
          //           </div>
          //       </div>
          //       <div className="col-4">
          //         <div className='card full-height'>
          //             <h5>Industry Distribution</h5>
          //             <Chart options={currIndustry.chartOptions} series={currIndustry.series} type='donut' />
          //         </div>
          //       </div>
          //       <div className="col-4">
          //         <div className='card full-height'>
          //             <h5>Other Stats</h5>
                      
          //         </div>
          //       </div>
          //       <div className="col-12">
          //         <div className='card full-height'>
          //           <div className='card__header'>
          //             <h3>Trading Record</h3>
          //           </div>
          //           <Table 
          //             headData={tradingTableHead}
          //             renderHead={(item, index) => renderTableHead(item, index)}
          //             renderBody={(item, index) => renderTableBody(item, index)}                    
          //           />
          //           <div>

          //           </div>

          //         </div>
          //       </div>          
                
          //   </div>
//           </div>
//           <div className={toggleState === 2 ? "content  active-content" : "content"}>
//             <div className="row">
//               <div className="col-4">
//                   <div className='card full-height'>
//                     <h5>Total Cost: ${totalValueWk45.toFixed(2)}</h5>
//                     <Chart options={predValue.chartOptions} series={predValue.series} type='donut' />
//                   </div>
//               </div>
//               <div className="col-4">
//                 <div className='card full-height'>

//                 </div>
//               </div>
//               <div className="col-4">
//                 <div className='card full-height'>
//                     <h5>Other Stats</h5>
                    
//                 </div>
//               </div>
//               <div className="col-12">
//                 <div className='card full-height'>
//                   <div className='card__header'>
//                     <h3>Trading Record</h3>
//                   </div>
//                   <Table 
//                     headData={tradingTableHead}
//                     renderHead={(item, index) => renderTableHead(item, index)}
//                     renderBody={(item, index) => renderTableBody(item, index)}                    
//                   />
//                 </div>
//               </div>                   
//             </div>                  
//           </div>
//         </div>
//       </div>
//     );
//   }
  
// export default Tabs;

// <button onClick={() => {plotChart1(chart1StockName)}}>Search</button>
// <iframe width="900" height="800" frameborder="0" scrolling="no" src="//plotly.com/~fyp21dl3/26.embed"></iframe>

/*
<div style={{ maxWidth: "35vh" }}>
<h6>Stock Distributions in terms of Cost</h6>
<Pie data={dataChart2} height={200} options={optionsChart2} />
</div>   
*/

// <iframe width="900" height="800" frameborder="0" scrolling="no" src="//plotly.com/~fyp21dl3/8.embed"></iframe>

// https://www.youtube.com/watch?v=re3OIOr9dJI 1:11:48
// ...userList in then() of Axios.get ... is destructor for add
// https://www.youtube.com/watch?v=AohARsUlwQk 19:08, userList, use map for update


// <button onClick={getHoldings}>Show Holdings</button>


// import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import { Container, Card, Row, Col, Button, Form, Nav } from 'react-bootstrap'

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  // const SystemCurrTIME = '16:30:00'
  // const SystemCurrDATE = '2021-11-04' // one date later for difference between date in res.send and mysql
  // const SystemEndPredDATE = '2021-11-15'
  // var currDate = new Date(SystemCurrDATE)
  // currDate = currDate.toISOString().split('T')[0]

  const SystemCurrTIME = '16:30:00'
  const SystemCurrDATE = '2022-04-21' // one date later for difference between date in res.send and mysql
  const SystemEndPredDATE = '2022-04-27'
  var currDate = new Date(SystemCurrDATE)
  // var yesterdayDate = new Date(SystemDATE)
  // yesterdayDate.setDate(currDate.getDate()-1)
  var endPredDate = new Date(SystemEndPredDATE);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [currWeekNo, setCurrWeekNo] = useState(18)
  const [nextWeekNo, setNextWeekNo] = useState(19)

  const [currWeekRecomend, setcurrWeekRecomend] = useState([]);
  const [nextWeekRecomend, setnextWeekRecomend] = useState([]);

  const [currWeekBuyCost, setcurrWeekBuyCost] = useState(0);
  const [nextWeekBuyCost, setnextWeekBuyCost] = useState(0);

  const [currWeekExitValue, setcurrWeekExitValue] = useState(0);
  const [nextWeekExitValue, setnextWeekExitValue] = useState(0);

  const { currentUser } = useAuth()
  const userID = currentUser.uid // ZtGPo16e7rdc3lt0m4xGAK8PsB03

  // userHoldings store all data
  const [userHoldings, setUserHoldings] = useState([]); // this is a list
  const [sumOfCost, setSumOfCost] = useState(0)

  const getHoldings = (userIDget) => {
      // console.log(currentUser.uid)
      Axios.get(`http://localhost:3001/holdings${userIDget}`).then( // Axios.get('http://localhost:3001/holdings', {userID: currentUserID})
          (response) => {
              // console.log(currentUser.uid)
              console.log(response.data)
              setUserHoldings(response.data) // response has a propert call data
              // setSumOfCost(response.data.map( (value, key) => (value.cost)).reduce( (accumulator, currentValue) => {return accumulator + currentValue}))
          }
      ); // get request, response contains everything send from the backend
  };
    //, {userID: currentUser.uid} // , {userID: 'ZtGPo16e7rdc3lt0m4xGAK8PsB03'}

  const getcurrweekRecommendation = (userIDget, currWeekNoget) => {
    Axios.post('http://localhost:3001/getcurrweeklyRecommendation', {
        userID: userIDget,
        weekNo: currWeekNoget,
      }).then(
        (response) => {
          console.log(response.data);
          setcurrWeekRecomend(response.data);
          // console.log(currWeekRecomend);
          setcurrWeekBuyCost( response.data.length > 0 ? 
            response.data.map( (value, key) => (value.predicted_cost) ).reduce( 
              (accumulator, currentValue) => {return accumulator+currentValue} 
              ) : null);
          setcurrWeekExitValue( response.data.length > 0 ? 
            response.data.map( (value, key) => (value.exit_value) ).reduce( 
              (accumulator, currentValue) => {return accumulator+currentValue} 
              ) : null ) 
      }
    )
  };

  const [calCurrBuyCost, setcalCurrBuyCost] = useState();

  const getnextweekRecommendation = (userIDget, nextWeekNoget) => {
    Axios.post('http://localhost:3001/getnextweeklyRecommendation', {
        userID: userIDget,
        weekNo: nextWeekNoget,
      }).then(
        (response) => {
          console.log(response.data);
          setnextWeekRecomend(response.data);
          setnextWeekBuyCost( response.data.length > 0 ? 
            response.data.map( (value, key) => (value.predicted_cost) ).reduce( 
              (accumulator, currentValue) => {return accumulator+currentValue} 
              ) : null);
          setnextWeekExitValue( response.data.length > 0 ? 
            response.data.map( (value, key) => (value.exit_value) ).reduce( 
              (accumulator, currentValue) => {return accumulator+currentValue} 
              ) : null )
      }
    )
  };

  const currCost = {
    series: currWeekRecomend.map( (value, key) => (value.predicted_cost) ), // StockValueWk44, // userHoldings.map( (value, key) => (value.cost) ),
    chartOptions: {
      labels: currWeekRecomend.map( (value, key) => (value.stock_code) ), // StockNameWk44, // userHoldings.map( (value, key) => (value.stock) ),
      chart: {
        type: 'dount',
        width: '100%',
      },
      plotOptions: {
        pie: {
          dount: {
            labels: {
              show: true,
              total: {
              show: true,
              showAlways: true,
              },
            },
          },
        },
      }, 
    },        
  }

  const currValue = {
    series: currWeekRecomend.map( (value, key) => (value.exit_value) ),
    chartOptions: {
      labels: currWeekRecomend.map( (value, key) => (value.stock_code) ),
      chart: {
        type: 'dount',
        width: '100%',
      },
      plotOptions: {
        pie: {
          dount: {
            labels: {
              show: true,
              total: {
              show: true,
              showAlways: true,
              },
            },
          },
        },
      }, 
    },        
  }

  
  const predCost = {
    series: nextWeekRecomend.map( (value, key) => (value.predicted_cost) ), // userHoldings.map( (value, key) => (value.cost) ),
    chartOptions: {
      labels: nextWeekRecomend.map( (value, key) => (value.stock_code) ), // userHoldings.map( (value, key) => (value.stock) ),
      chart: {
        type: 'dount',
        width: '100%',
      },
      plotOptions: {
        pie: {
          dount: {
            labels: {
              show: true,
              total: {
              show: true,
              showAlways: true,
              },
            },
          },
        },
      }, 
    },        
  }

  const predValue = {
    series: nextWeekRecomend.map( (value, key) => (value.exit_value) ),
    chartOptions: {
      labels: nextWeekRecomend.map( (value, key) => (value.stock_code) ),
      chart: {
        type: 'dount',
        width: '100%',
      },
      plotOptions: {
        pie: {
          dount: {
            labels: {
              show: true,
              total: {
              show: true,
              showAlways: true,
              },
            },
          },
        },
      }, 
    },        
  }

  const [usertradingRecord, setuserTradingRecord] = useState();

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
    { field: 'entry_date', sortable: true, filter: true, displayName: "Entry Date" },
    { field: 'stock_code', sortable: true, filter: true, displayName: "Stock"  },
    { field: 'num_of_shares', sortable: true, filter: true, displayName: "Quantity"  },
    { field: 'entry_price', sortable: true, filter: true, displayName: "Entry Price"  },
    { field: 'stoploss', sortable: true, filter: true, displayName: "Stoploss"  },
    { field: 'exit_price', sortable: true, filter: true, displayName: "Exit Price"  },
    { field: 'pnl', sortable: true, filter: true, displayName: "P / L"  },
  ])



  const [nextWeekCorrelation, setnextWeekCorrelation] = useState()

  const getnextweekcorrelation = () => {
    Axios.get('http://localhost:3001/getnextweekcorrelation', {
      }).then(
        (response) => {
          console.log(response.data);
          setnextWeekCorrelation(response.data);
          // console.log(currWeekRecomend);
          // setcurrWeekBuyCost( response.data.map( (value, key) => (value.predicted_cost) ).reduce( (accumulator, currentValue) => {return accumulator+currentValue} ) )
      }
    )
  };

  const [colDefsCorrleation, setcolDefsCorrleation] = useState([
    { field: 'Stock', sortable: true, filter: true, displayName: "Stock" },
    { field: 'AMCR US EQUITY', sortable: true, filter: true, displayName: "AMCR" },
    { field: 'OGN US EQUITY', sortable: true, filter: true, displayName: "OGN"  },
    { field: 'T US EQUITY', sortable: true, filter: true, displayName: "T"  },
    { field: 'FOX US EQUITY', sortable: true, filter: true, displayName: "FOX"  },
    { field: 'JNPR US EQUITY', sortable: true, filter: true, displayName: "JNPR"  },
    { field: 'CAG US EQUITY', sortable: true, filter: true, displayName: "CAG"  },
    { field: 'NLOK US EQUITY', sortable: true, filter: true, displayName: "NLOK"  },
    { field: 'NI US EQUITY', sortable: true, filter: true, displayName: "NI"  },
    { field: 'K US EQUITY', sortable: true, filter: true, displayName: "K"  },
    { field: 'CPB US EQUITY', sortable: true, filter: true, displayName: "CPB"  },
    { field: 'FE US EQUITY', sortable: true, filter: true, displayName: "FE"  },
    { field: 'CTVA US EQUITY', sortable: true, filter: true, displayName: "CTVA"  },
    { field: 'PFE US EQUITY', sortable: true, filter: true, displayName: "PFE"  },
  ])



  const corrweek45 = {
    head: ["Stock", "NVDA", "NFLX", "DXCM", "ABMD", "CZR", "MSCI", "LDOS", "ODFL", "POOL", "MRNA", "DPZ", "MKTX", "EXR", "LLY"],
    body: corrWeek45Data
  }

  const renderTableHead = (item, index) => (
    <th key={index}>{item}</th>
  )
  const rendercorrweek45Body = (item, index) => (
    <tr key={index}>
        <td>{item.Stock}</td>
        <td style={{color: item.NVDA >= 0 ? "green" : "red"}} >{item.NVDA.toFixed(4)}</td>
        <td style={{color: item.NFLX >= 0 ? "green" : "red"}}>{item.NFLX.toFixed(4)}</td>
        <td style={{color: item.DXCM >= 0 ? "green" : "red"}}>{item.DXCM.toFixed(4)}</td>
        <td style={{color: item.ABMD >= 0 ? "green" : "red"}}>{item.ABMD.toFixed(4)}</td>
        <td style={{color: item.CZR >= 0 ? "green" : "red"}}>{item.CZR.toFixed(4)}</td>
        <td style={{color: item.MSCI >= 0 ? "green" : "red"}}>{item.MSCI.toFixed(4)}</td>
        <td style={{color: item.LDOS >= 0 ? "green" : "red"}}>{item.LDOS.toFixed(4)}</td>
        <td style={{color: item.ODFL >= 0 ? "green" : "red"}}>{item.ODFL.toFixed(4)}</td>
        <td style={{color: item.POOL >= 0 ? "green" : "red"}}>{item.POOL.toFixed(4)}</td>
        <td style={{color: item.MRNA >= 0 ? "green" : "red"}}>{item.MRNA.toFixed(4)}</td>
        <td style={{color: item.DPZ >= 0 ? "green" : "red"}}>{item.DPZ.toFixed(4)}</td>
        <td style={{color: item.MKTX >= 0 ? "green" : "red"}}>{item.MKTX.toFixed(4)}</td>
        <td style={{color: item.EXR >= 0 ? "green" : "red"}}>{item.EXR.toFixed(4)}</td>
        <td style={{color: item.LLY >= 0 ? "green" : "red"}}>{item.LLY.toFixed(4)}</td>
    </tr>
  )

  const rendertradingRecordBody = (item, index) => (
    <tr key={index}>
        <td>{item.Date}</td>
        <td>{item.Stock}</td>
        <td>{item.Action}</td>
        <td>${item.Price}</td>
        <td>{item.Quantity}</td>
        <td>${item.Value}</td>      
        <td style={{color: item.Profit >= 0 ? "green" : "red"}}>{item.Profit}</td>
    </tr>
  )

  useEffect( () => {
    getHoldings(userID);
    getcurrweekRecommendation(userID, currWeekNo);
    getnextweekRecommendation(userID, nextWeekNo);
    getTradingRecording(userID);
    getnextweekcorrelation();
  }, []);

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
          <Tab label="Current (This Week)" {...a11yProps(0)} />
          <Tab label="Recommended (Next week)" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className="row">
          <div className="col-4 sm-6">
            <div className='card full-height'>
              <h5>Total Cost: ${ currWeekBuyCost ? currWeekBuyCost.toFixed(2) : null} </h5>
              <Chart options={currCost.chartOptions} series={currCost.series} type='donut' />
            </div>
          </div>
          <div className="col-4 sm-6">
            <div className='card full-height'>
                <h5>Current Value: ${ currWeekExitValue ? currWeekExitValue.toFixed(2) : null}</h5>
                <Chart options={currValue.chartOptions} series={currValue.series} type='donut' />
            </div>
          </div>
          <div className="col-4 sm-12">
            <div className='card full-height'>
                <h5>Review</h5>
                <p className="ms-2 text-muted">Actual Earning in this Week:</p>
                <Box>
                <div className='col-12 mt-1'>
                  <h4 style={{color: 'green'}}> +{((currWeekExitValue/currWeekBuyCost - 1)*100).toFixed(2)}%</h4>
                  <h4 style={{color: 'green'}}> ${(currWeekExitValue - currWeekBuyCost).toFixed(2)}</h4>   
                </div>
                </Box>               
            </div>
          </div>
          <div className="col-12">
            <div className='card full-height'>
              <div className='card__header'>
                <h3>Trading Record</h3>
              </div>
              {/* <Table 
                headData={tradingRecord.head}
                renderHead={(item, index) => renderTableHead(item, index)}
                bodyData={tradingRecord.body}
                renderBody={(item, index) => rendertradingRecordBody(item, index)}                    
              /> */}
              <div className="ag-theme-alpine" style={{height: 400, width : '100%'}}>
                <AgGridReact
                    rowData={usertradingRecord}
                    columnDefs={colDefsTrading}
                    animateRows={true} >
                </AgGridReact>
              </div>
            </div>
          </div>          
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <div className="row">
          <div className="col-4 sm-6">
            <div className='card full-height'>
              <h5>Predicted Cost: ${nextWeekBuyCost ? nextWeekBuyCost.toFixed(2) : null }</h5>
              <Chart options={predCost.chartOptions} series={predCost.series} type='donut' />
            </div>
          </div>
          <div className="col-4 sm-6">
            <div className='card full-height'>
                <h5>Predicted Value: ${ nextWeekExitValue ? nextWeekExitValue.toFixed(2) : null }</h5>
                <Chart options={predValue.chartOptions} series={predValue.series} type='donut' />
            </div>
          </div>
          <div className="col-4 sm-12">
            <div className='card full-height'>
                <h5>Prediction</h5>
                <p className="ms-2 text-muted">Estimated Earning in next week:</p>
                <Box>
                  <div className='col-12 mt-1'>
                    <h4 style={{color: 'green'}}> +{((nextWeekExitValue/nextWeekBuyCost - 1)*100).toFixed(2)}%</h4>
                    <h4 style={{color: 'green'}}> ${(nextWeekExitValue - nextWeekBuyCost).toFixed(2)}</h4>                    
                  </div>
                </Box>                
            </div>
          </div>
          <div className="col-12">
            <div className='card full-height'>
              <div className='card__header'>
                <h3>Correlation Table</h3>
              </div>
              {/* <Table 
                headData={corrweek45.head}
                renderHead={(item, index) => renderTableHead(item, index)}
                bodyData={corrweek45.body}
                renderBody={(item, index) => rendercorrweek45Body(item, index)}                    
              /> */}
              <div className="ag-theme-alpine" style={{height: 600, width : '100%'}}>
                <AgGridReact
                    rowData={nextWeekCorrelation}
                    columnDefs={colDefsCorrleation}
                    animateRows={true} >
                </AgGridReact>
              </div>
            </div>
          </div>          
        </div> 
      </TabPanel>
    </Box>
  );
}



// the follwoing codes to show all user holdings
/*
<p>
  {userHoldings.map((value, key) => {
      return <div>
        <hr />
        Stock: {value.stock} <tr />
        Buying Price: {value.buyPrice} <tr />
        Holding Quantity: {value.quantity} <tr />
        Cost: {value.cost} <tr />
      </div>
  })}
  <hr />
</p> 
*/

// {holdingsDistributionData.dataset[0].data.map( (value, key) => {return <div>{value}</div>} )}


// passing the data into another function in another page
// https://www.youtube.com/watch?v=RF57yDglDfE