import React from 'react'
import DisplayButton from './DisplayButton'

import DisplayOptionsEnum from '../DisplayOptionEnum'

const DisplayButtons = ({selectedOption, onClick}) => (
  <div className='buttons has-addons'>
    <DisplayButton icon='fa-less-than'
                   selected={selectedOption === DisplayOptionsEnum.PREVIOUS}
                   onClick={onClick}
                   option={DisplayOptionsEnum.PREVIOUS}/>
    <DisplayButton icon='fa-greater-than'
                   selected={selectedOption === DisplayOptionsEnum.CURRENT}
                   onClick={onClick}
                   option={DisplayOptionsEnum.CURRENT}/>
    <DisplayButton icon='fa-not-equal'
                   selected={selectedOption === DisplayOptionsEnum.DIFF}
                   onClick={onClick}
                   option={DisplayOptionsEnum.DIFF}/>
    <DisplayButton icon='fa-arrows-alt-h'
                   selected={selectedOption === DisplayOptionsEnum.SIDE_BY_SIDE}
                   onClick={onClick}
                   option={DisplayOptionsEnum.SIDE_BY_SIDE}/>
  </div>
)

export default DisplayButtons