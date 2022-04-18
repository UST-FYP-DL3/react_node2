import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Group from '../pages/Group'
import Stocks from '../pages/Stocks'
import Setting from '../pages/Setting'
import Portfolio from '../pages/Portfolio'
// import Preference from './InvestmentPreference/Preference'
// <Route path="/preferenceLogin" component={Preference} />

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Dashboard}/>
            <Route path='/dashboard' component={Dashboard}/>
            <Route path='/group' component={Group}/>
            <Route path='/stocks' component={Stocks}/>
            <Route path='/setting' component={Setting}/>
            <Route path='/portfolio' component={Portfolio}/>            
        </Switch>
    )
}

export default Routes
