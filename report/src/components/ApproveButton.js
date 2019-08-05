import React from 'react'

const ApproveButton = ({ onClick }) => (
  <span className='button is-success' onClick={onClick}>
    <span className='icon is-large'>
      <i className='fas fas-lg fa-check'/>
    </span>
  </span>
)

export default ApproveButton