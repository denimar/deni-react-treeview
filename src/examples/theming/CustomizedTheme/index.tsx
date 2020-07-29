import React from 'react'
import DeniReactTreeView from "../../../components"
import './theming-customizations.scss'

const CustomeziedTheme = () => {
  return (
    <div className="theme-customization">
      <DeniReactTreeView 
        className="treeview-teste" 
        url="https://bit.ly/39AZt11">
      </DeniReactTreeView>   
      <br />
      <a href="https://raw.githubusercontent.com/denimar/deni-react-treeview/develop/src/examples/theming/theming-customizations.scss">theming-customizations.scss</a>
    </div>  
  )
}  

export default CustomeziedTheme