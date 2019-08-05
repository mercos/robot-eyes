import React from 'react'
import ViewportButton from "./ViewportButton"

const renderViewportButton = (viewport, onClick) => (
  <ViewportButton viewport={viewport} onClick={onClick}/>
)

const ViewportButtons = ({viewports, onClick}) => (
  <div className='buttons has-addons viewport-buttons'>
    {
      viewports.map(vp => renderViewportButton(vp, onClick))
    }
  </div>
)

export default ViewportButtons