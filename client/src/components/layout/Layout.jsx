import React, { useState, useEffect} from 'react'

import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

import './layout.css'

import Sidebar from '../sidebar/Sidebar'
import TopNav from '../topnav/TopNav'
import Routes from '../Routes'

import { BrowserRouter, Route } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'

import ThemeAction from '../../redux/actions/ThemeAction'

/*
const Layout = () => {

    const themeReducer = useSelector(state => state.ThemeReducer)

    const dispatch = useDispatch()

    useEffect(() => {
        const themeClass = localStorage.getItem('themeMode', 'theme-mode-light')

        const colorClass = localStorage.getItem('colorMode', 'theme-mode-light')

        dispatch(ThemeAction.setMode(themeClass))

        dispatch(ThemeAction.setColor(colorClass))
    }, [dispatch])

    return (
        <BrowserRouter>
            <Route render={(props) => (
                <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
                    <Sidebar {...props}/>
                    <div className="layout__content">
                        <TopNav/>
                        <div className="layout__content-main">
                            <Routes/>
                        </div>
                    </div>
                </div>
            )}/>
        </BrowserRouter>
    )
}

export default Layout
*/

// import { Container } from 'react-bootstrap'

const Layout = () => {

    // move the code to TovNav.jsx
    /*
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
      */

return (
    <BrowserRouter>
        <Route render = {(props) => (
            <div className = 'layout'>
                <Sidebar {...props}/>
                <div className = 'layout__content'>
                    <TopNav/>
                    <div className = 'layout__content-main'>
                        <Routes/>
                    </div>
                </div>
            </div>
        )} />
    </BrowserRouter>
    )
}



export default Layout