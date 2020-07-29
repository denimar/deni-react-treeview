```javascript
import React from 'react'
import DeniReactTreeView from 'deni-react-treeview'

const SelectRowOption: React.FC = () => {
  return (
    <DeniReactTreeView 
      url="https://raw.githubusercontent.com/denimar/fakedata/master/data/trees/countries.json" 
      selectRow={ true } 
    />
  )  
}

export default SelectRowOption
```
