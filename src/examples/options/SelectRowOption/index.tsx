import React from 'react'
import DeniReactTreeView from '../../../components'

const SelectRowOption: React.FC = () => {
  return (
    <DeniReactTreeView 
      url="https://raw.githubusercontent.com/denimar/fakedata/master/data/trees/countries.json" 
      selectRow={ true } 
    />
  )  
}

export default SelectRowOption