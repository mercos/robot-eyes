import React from 'react'

const DisplayButton = ({ icon, selected, onClick, option }) => (
  <span className={`button display-button ${selected ? 'is-info' : ''}`} onClick={() => onClick(option)}>
    <span className='icon is-large'>
      <i className={`fas fas-lg ${icon}`}/>
    </span>
  </span>
)

export default DisplayButton