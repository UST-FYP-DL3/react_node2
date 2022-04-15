import React, {useEffect, useState} from 'react'
import{ useRef } from "react"
import { useAuth } from "../../contexts/AuthContext"

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

    const [userHoldings, setUserHoldings] = useState([]);

    const getHoldings = () => {
        // console.log(currentUser.uid)
        Axios.post("http://localhost:3001/holdings", {userID: currentUser.uid}).then(
            (response) => {
                // console.log(currentUser.uid)
                console.log(response.data)
                setUserHoldings(response.data) // response has a propert call data
            }
        ); // get request, response contains everything send from the backend
    };
      //, {userID: currentUser.uid} // , {userID: 'ZtGPo16e7rdc3lt0m4xGAK8PsB03'}

    const [holdingData, setholdingData] = useState([]);

    const [toggleState, setToggleState] = useState(1);
  
    const toggleTab = (index) => {
      setToggleState(index);
    };
  
    return (
      <div>
        <div className="bloc-tabs">
            <button className={toggleState === 1 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(1)}>
                Current (This week)
            </button>
            <button className={toggleState === 2 ? "tabs active-tabs" : "tabs"} onClick={() => toggleTab(2)}>
                Recommend (Next Week)
            </button>
        </div>

        <div className="content-tabs">
            <div className={toggleState === 1 ? "content  active-content" : "content"}>
                <h3>Your Portfolio</h3>
                {currentUser.uid}
                <p>
                  <button onClick={getHoldings}>Show Holdings</button>
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
            </div>
          <div className={toggleState === 2 ? "content  active-content" : "content"}>
                <h3>Prediction for Next Week</h3>
                <hr />
          </div>
        </div>
      </div>
    );
  }
  
export default Tabs;


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
