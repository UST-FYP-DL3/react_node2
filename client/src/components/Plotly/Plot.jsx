import React from 'react'

import createPlotlyComponent from 'react-plotly.js/factory'

function Plot(props) {

    const Plotly = window.Plotly
    const Plot = createPlotlyComponent(Plotly)
    
    return (
        <div>Plot</div>
    )
}


export default Plot
