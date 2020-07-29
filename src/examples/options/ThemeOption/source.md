```javascript
import React from 'react'
import DeniReactTreeView from 'deni-react-treeview'

const ThemeOption: React.FC = () => {
  return (
    <DeniReactTreeView 
      url="https://raw.githubusercontent.com/denimar/fakedata/master/data/trees/countries.json" 
      theme="metro"
    />
  )  
}

export default ThemeOption
```
