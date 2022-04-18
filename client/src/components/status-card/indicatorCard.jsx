import React from 'react'

import './statuscard.css'

const StatusCard = props => {
    return (
        <div className='status-card'>
            <div className="status-card__icon">
                <i style ={{color: '#00008B'}} className={props.icon}></i>
            </div>
            <div className="status-card__info">
                <a href ={props.link} style={{margin: "auto",fontSize: "25px"}} target="_blank">{props.title}</a>
            </div>
        </div>
    )
}

export default StatusCard
