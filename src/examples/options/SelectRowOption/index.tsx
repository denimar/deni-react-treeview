import React from 'react'
import DeniReactTreeView from '../../../components'

const SelectRowOption: React.FC = () => {
  return (
    <DeniReactTreeView 
      url="https://raw.githubusercontent.com/denimar/deni-react-treeview/develop/src/assets/data/countries.json" 
      selectRow={ true } 
    />
  )  
}

export default SelectRowOption