import React, {useEffect, useState} from 'react'
import{ useRef } from "react"
import { useAuth } from "../../contexts/AuthContext"

// import Chart from "react-apexcharts";

// tutorial
// https://www.youtube.com/watch?v=WkREeDy2WQ4; https://mui.com/material-ui/react-tabs/
// https://www.youtube.com/watch?v=mhjbACbSeSU; https://mui.com/material-ui/react-tabs/

//export function useAuth() {
//  return useContext(AuthContext)
//}

import { Link } from 'react-router-dom'

import Chart from 'react-apexcharts'

import { useSelector } from 'react-redux'

import Axios from 'axios'

import './portfolioTabs.css'


function Tabs() {
    const { currentUser } = useAuth()
    const userID = currentUser.uid // ZtGPo16e7rdc3lt0m4xGAK8PsB03

    // userHoldings store all data
    const [userHoldings, setUserHoldings] = useState([]); // this is a list

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
      //, {userID: currentUser.uid} // , {userID: 'ZtGPo16e7rdc3lt0m4xGAK8PsB03'}

    // const [holdingData, setholdingData] = useState([]);

    const [toggleState, setToggleState] = useState(1);
       
    const toggleTab = (index) => {
      setToggleState(index);
    };
    
    function tab1ClickwithData(index, userID) {
      toggleTab(index);
      getHoldings(userID);
    }

    function tab2ClickwithData(index, userID) {
      toggleTab(index);
      // getHoldings(userID);
    }

    const holdingsDistributionData = {
      labels: userHoldings.map( (value, key) => (value.stock) ),
      dataset: [{
        label: 'Holdings Distribution',
        data: userHoldings.map( (value, key) => (value.cost) ),
      }]
    };

    const dataChart = {
      chartOptions: {
        labels: userHoldings.map( (value, key) => (value.stock) ),
        chart: {
          // type: 'dount'
        }
      },
      series: userHoldings.map( (value, key) => (value.cost) ),
    }
  
    return (
      <div>
        <div className="bloc-tabs">
            <button className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={() => tab1ClickwithData(1, userID)}>
                Current (This week)
            </button>
            <button className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={() => tab2ClickwithData(2, userID)}>
                Recommend (Next Week)
            </button>
        </div>

        <div className="content-tabs">
          <div className={toggleState === 1 ? "content  active-content" : "content"}>
            <div classname='row'>
              <div classname='col-6'>
                <h6>Stock Distributions</h6>
                <Chart options={dataChart.chartOptions} series={dataChart.series} type='donut' width='25%'/>
              </div>
            </div>
            
          </div>
          <div className={toggleState === 2 ? "content  active-content" : "content"}>
                <div className='row'>
                    <div className='col-4'>
                      <div className='row'>
                        <h6>Chart 1:</h6>
                        <iframe width="300" height="400" frameborder="0" scrolling="no" src="//plotly.com/~fyp21dl3/1.embed"></iframe>
                      </div>                      
                    </div>
                    <div className='col-6'>
                      <h6>Chart 2:</h6>
                    </div>                    
                </div>           
          </div>
        </div>
      </div>
    );
  }
  
export default Tabs;

// https://www.youtube.com/watch?v=re3OIOr9dJI 1:11:48
// ...userList in then() of Axios.get ... is destructor for add
// https://www.youtube.com/watch?v=AohARsUlwQk 19:08, userList, use map for update


// <button onClick={getHoldings}>Show Holdings</button>

/*
// import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="fullWidth">
          <Tab label="Current (This Week)" {...a11yProps(0)} />
          <Tab label="Recommended (Next week)" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        Item One
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
    </Box>
  );
}
*/


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