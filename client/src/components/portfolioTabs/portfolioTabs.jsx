import React, {useEffect, useState} from 'react'
import{ useRef } from "react"
import { useAuth } from "../../contexts/AuthContext"

//export function useAuth() {
//  return useContext(AuthContext)
//}

import { Link } from 'react-router-dom'

import Chart from 'react-apexcharts'

import { useSelector } from 'react-redux'

import Axios from 'axios'

import './portfolioTabs.css'

/*
const portfolioTabs = () => {

    return (
        <div>
            
            
        </div>
    )
}

export default portfolioTabs
*/


function Tabs() {
    const { currentUser } = useAuth()

    const [toggleState, setToggleState] = useState(1);
  
    const toggleTab = (index) => {
      setToggleState(index);
    };

    const testNumber = 1 + 1
  
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
                <p>
                    <hr />
                    {currentUser && currentUser.uid}
                </p>
            </div>
          <div className={toggleState === 2 ? "content  active-content" : "content"}>
                <h3>Prediction for Next Week</h3>
                <p>
                {testNumber}
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
                when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                It has survived not only five centuries, but also the leap into electronic 
                typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets 
                containing Lorem Ipsum passages, 
                and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
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