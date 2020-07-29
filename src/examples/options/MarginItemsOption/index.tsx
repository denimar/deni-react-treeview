import React from 'react'
import DeniReactTreeView from '../../../components'

const MarginItemsOption: React.FC = () => {
  return (
    <DeniReactTreeView 
      url="https://raw.githubusercontent.com/denimar/deni-react-treeview/develop/src/assets/data/countries.json" 
      marginItems="80" 
    />
  )  
}

export default MarginItemsOption