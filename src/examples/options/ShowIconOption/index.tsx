import React from 'react'
import DeniReactTreeView from '../../../components'

const ShowIconOption: React.FC = () => {
  return (
    <DeniReactTreeView 
      url="https://raw.githubusercontent.com/denimar/fakedata/master/data/trees/countries.json" 
      showIcon={ false } 
    />
  )  
}

export default ShowIconOption