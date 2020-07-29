import React from 'react'
import DeniReactTreeView from '../../../components'

const ShowIconOption: React.FC = () => {
  return (
    <DeniReactTreeView 
      url="https://raw.githubusercontent.com/denimar/deni-react-treeview/develop/src/assets/data/countries.json" 
      showIcon={ false } 
    />
  )  
}

export default ShowIconOption