```javascript
import React from 'react'
import DeniReactTreeView from "../../../components"
import './theming-customizations.scss'

const CustomeziedTheme = () => {
  return (
    <div className="theme-customization">
      <DeniReactTreeView 
        className="treeview-teste" 
        url="https://raw.githubusercontent.com/denimar/fakedata/master/data/trees/dogs.json">
      </DeniReactTreeView>   
    </div>  
  )
}  

export default CustomeziedTheme
```
