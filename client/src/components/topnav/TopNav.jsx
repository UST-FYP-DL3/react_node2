//import React from 'react'

import './topnav.css'

import 'bootstrap/dist/css/bootstrap.min.css'

// import { Link } from 'react-router-dom'

import Dropdown from '../dropdown/Dropdown'

import React, { useState } from "react"
import { Card, Button, Alert, Container } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

import stockConstituents from '../../assets/JsonData/stockConstituents.json'

import SearchBar from '../searchBar/SearchBar'

// import ThemeMenu from '../thememenu/ThemeMenu'

import notifications from '../../assets/JsonData/notification.json'
import favList from '../../assets/JsonData/favList.json'

import user_image from '../../assets/images/photo3.jfif'
import user_menu from '../../assets/JsonData/user_menus.json'

const curr_user = {
    display_name: 'Jackson, Wong',
    image: user_image
}



const renderFavListMenu =(item, index) => (
    <div className="notification-item">
        <i className={item.icon}></i>
        <span>{item.content}</span>
    </div>
)

const renderNotificationItem = (item, index) => (
    <div className="notification-item" key={index}>
        <i className={item.icon}></i>
        <span>{item.content}</span>
    </div>
)

const renderUserMenu =(item, index) => (
    <Link to='/' key={index}>
        <div className="notification-item">
            <i className={item.icon}></i>
            <span>{item.content}</span>
        </div>
    </Link>
)

const renderUserToggle = (user) => (
    <div className="topnav__right-user">
        <div className="topnav__right-user__image">
            <img src={user.image} alt="" />
        </div>
        <div className="topnav__right-user__name">
            {user.display_name}
        </div>
    </div>
)


function Topnav() {

    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        setError("")

        try {
        await logout()
        history.push("/login")
        } catch {
        setError("Failed to log out")
        }
    }


    return (
        <div className='topnav'>
            <SearchBar placeholder="Enter a symbol" data={stockConstituents}/>
            <div className="topnav__search">
                {/* <input type="text" placeholder='Search here...' />
                <Button>
                    <i className='bx bx-search'></i>
                </Button> */}
                {/* <SearchBar placeholder="Enter a symbol" data={stockConstituents}/> */}
            </div>
            {/* <div className='box' style={{}}>
                <SearchBar placeholder="Enter a symbol" data={stockConstituents}/>
            </div> */}
            {/* Need re-write the Dropdown*/}
            <div className="topnav__right">
                <div className="topnav__right-item">
                    {/* dropdown here */}
                </div>
                <div className="topnav__right-item">
                    {/* dropdown here */}
                    <Dropdown
                        customToggle={() => renderUserToggle(curr_user)}
                        contentData={user_menu}
                        renderItems={(item, index) => renderUserMenu(item, index)}
                    />
                </div>
                <div className="topnav__right-item">
                    {/* dropdown here */}
                    <Dropdown
                        icon='bx bxs-star'
                        contentData={favList}
                        renderItems={(item, index) => renderFavListMenu(item, index)}
                        renderFooter={() => <Link to='/'>View All</Link>}
                    />
                </div>
                <div className="topnav__right-item">
                    <Dropdown
                        icon='bx bx-bell'
                        badge='6'
                        contentData={notifications}
                        renderItems={(item, index) => renderNotificationItem(item, index)}
                        renderFooter={() => <Link to='/'>View All</Link>}
                    />
                    {/* dropdown here */}
                </div>
                <div className="topnav__right-item">
                    <Button variant="primary" onClick={handleLogout}>Log Out</Button>
                </div>

            </div>
        </div>
    )
}

export default Topnav

/*
                <div className="topnav__right-item">
                    <ThemeMenu/>
                </div>          
*/
