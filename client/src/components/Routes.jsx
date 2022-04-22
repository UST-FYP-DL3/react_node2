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
            <Route exact path='/' component={Dashboard}/>
            {/* <Route path='/dashboard' component={Dashboard}/> */}
            <Route exact path='/group' component={Group}/>
            <Route exact path='/stocks' component={Stocks}/>
            <Route exact path='/setting' component={Setting}/>
            <Route exact path='/portfolio' component={Portfolio}/>            
        </Switch>
    )
}

export default Routes
