import React from 'react'

const ViewportButton = ({ viewport, onClick }) => (
  <span className={`button ${viewport.selected ? 'is-info' : ''}`} onClick={() => onClick(viewport)}>
    {viewport.name}
  </span>
)

export default ViewportButton