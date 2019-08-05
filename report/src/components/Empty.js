import React from 'react'
import {remote} from 'electron'
import './Empty.scss'

const closeElectron = () => {
  let w = remote.getCurrentWindow()
  w.close()
}

const Empty = () => {
  return (
    <div className='empty'>
      <span className='button is-success is-rounded is-large' onClick={closeElectron}>
        <span className='icon is-large'>
          <i className='fas fas-lg fa-check'/>
        </span>
      </span>
      <span>
        All images have been approved, click here to close.
      </span>
    </div>
  )
}

export default Empty