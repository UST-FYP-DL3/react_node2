import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Analytics from '../pages/Analytics'
import Stocks from '../pages/Stocks'
import Setting from '../pages/Setting'


const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Dashboard}/>
            <Route path='/dashboard' component={Dashboard}/>
            <Route path='/analytics' component={Analytics}/>
            <Route path='/stocks' component={Stocks}/>
            <Route path='/setting' component={Setting}/>
        </Switch>
    )
}

export default Routes
