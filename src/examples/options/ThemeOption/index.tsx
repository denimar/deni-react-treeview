import React from 'react'
import DeniReactTreeView from '../../../components'

const ThemeOption: React.FC = () => {
  return (
    <DeniReactTreeView 
      url="https://raw.githubusercontent.com/denimar/deni-react-treeview/develop/src/assets/data/countries.json" 
      theme="metro"
    />
  )  
}

export default ThemeOption