```javascript
import React from 'react'
import DeniReactTreeView from 'deni-react-treeview'

const MarginItemsOption: React.FC = () => {
  return (
    <DeniReactTreeView 
      url="https://raw.githubusercontent.com/denimar/fakedata/master/data/trees/countries.json" 
      marginItems="80" 
    />
  )  
}

export default MarginItemsOption
```
