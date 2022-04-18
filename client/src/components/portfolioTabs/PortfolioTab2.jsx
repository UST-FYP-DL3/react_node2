import React, {useEffect, useState} from 'react'
import{ useRef } from "react"
import { useAuth } from "../../contexts/AuthContext"
import { useSelector } from 'react-redux'
import Axios from 'axios'
import './portfolioTabs.css'

import Table from '../table/Table'

import { Link } from 'react-router-dom'

import Chart from 'react-apexcharts'

function PortfolioTab2() {

  var StockNameWk45 = ["ABMD", "CZR", "DPZ", "DXCM", "EXR", "LDOS", "LLY", 
                                "MKTX", "MRNA", "MSCI", "NFLX", "NVDA", "ODFL", "POOL"]
  var StockShareWk45 = [1, 2, 3, 1, 7, 2, 1, 1, 4, 1, 1, 5, 3, 1]
  var StockPricePredWk45 = [364.71560, 107.213300, 501.98077, 627.79380, 195.39474, 96.085526, 263.89730,
                            393.45030, 244.98958, 659.07855, 220.73108, 655.76930, 291.66815, 348.09146, 519.73720]
  var StockValuePredWk45 = []
  for (var i = 0; i < StockShareWk45.length; i++) {
    StockValuePredWk45[i] = StockShareWk45[i]*StockPricePredWk45[i]
  }
  var totalValueWk45 = StockValuePredWk45.reduce( (accumulator, currentValue) => {return accumulator+currentValue} )

  const predValue = {
    series: StockValuePredWk45, // userHoldings.map( (value, key) => (value.cost) ),
    chartOptions: {
      labels: StockNameWk45, // userHoldings.map( (value, key) => (value.stock) ),
      chart: {
        type: 'dount',
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

  const renderTableHead = (item, index) => (
    <th key={index}>{item}</th>
  )

  const renderTableBody = (item, index) => (
    <tr key={index}>
        <td>{item.stock}</td>
        <td>{item.quantity}</td>
        <td>{item.buyPrice}</td>
        <td>{item.cost}</td>
    </tr>
  )
  
  const tradingTableHead = StockNameWk45


  return (
    <div className="row">
      <div className="col-4">
          <div className='card full-height'>
            <h5>Total Cost: ${totalValueWk45.toFixed(2)}</h5>
            <Chart options={predValue.chartOptions} series={predValue.series} type='donut' />
          </div>
      </div>
      <div className="col-4">
        <div className='card full-height'>

        </div>
      </div>
      <div className="col-4">
        <div className='card full-height'>
            <h5>Other Stats</h5>
            
        </div>
      </div>
      <div className="col-12">
        <div className='card full-height'>
          <div className='card__header'>
            <h3>Trading Record</h3>
          </div>
          <Table 
            headData={tradingTableHead}
            renderHead={(item, index) => renderTableHead(item, index)}
            renderBody={(item, index) => renderTableBody(item, index)}                    
          />
        </div>
      </div>                   
    </div> 
  )
}

export default PortfolioTab2()
