import React from 'react'
import TwentyTwenty from "react-twentytwenty"
import DisplayOptionsEnum from "../DisplayOptionEnum"
import './DiffContainer.scss'

const renderDiffContainer = (viewport, displayOption) => {
  switch (displayOption) {
    case DisplayOptionsEnum.SIDE_BY_SIDE:
      return (
        <TwentyTwenty
          left={<img src={viewport.referenceImage}/>}
          right={<img src={viewport.testImage}/>}
          slider={<div className="slider" />}
        />
      )
    case DisplayOptionsEnum.PREVIOUS:
      return <img src={viewport.referenceImage}/>
    case DisplayOptionsEnum.CURRENT:
      return <img src={viewport.testImage}/>
      case DisplayOptionsEnum.DIFF:
      return <img src={viewport.diffImage}/>
  }
}

const DiffContainer = ({viewport, displayOption}) => (
  <center className='diff-container'>
    {
      renderDiffContainer(viewport, displayOption)
    }
  </center>
)

export default DiffContainer