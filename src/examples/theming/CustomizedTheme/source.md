```javascript
import React from 'react'
import DeniReactTreeView from "../../../components"
import './theming-customizations.scss'

const CustomeziedTheme = () => {
  return (
    <div className="theme-customization">
      <DeniReactTreeView 
        className="treeview-teste" 
        url="https://raw.githubusercontent.com/denimar/deni-react-treeview/develop/src/assets/data/dogs.json">
      </DeniReactTreeView>   
    </div>  
  )
}  

export default CustomeziedTheme
```
