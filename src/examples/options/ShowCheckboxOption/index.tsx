import React from 'react'
import DeniReactTreeView from '../../../components'

const ShowCheckboxOption: React.FC = () => {
  return (
    <DeniReactTreeView 
      url="https://raw.githubusercontent.com/denimar/deni-react-treeview/develop/src/assets/data/countries.json" 
      showCheckbox={ true } 
    />
  )  
}

export default ShowCheckboxOption