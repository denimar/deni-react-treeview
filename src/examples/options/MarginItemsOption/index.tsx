import React from 'react'
import DeniReactTreeView from '../../../components'

const MarginItemsOption: React.FC = () => {
  return (
    <DeniReactTreeView 
      url="https://raw.githubusercontent.com/denimar/fakedata/master/data/trees/countries.json" 
      marginItems="80" 
    />
  )  
}

export default MarginItemsOption