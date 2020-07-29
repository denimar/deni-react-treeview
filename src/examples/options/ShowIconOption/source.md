```javascript
import React from 'react'
import DeniReactTreeView from 'deni-react-treeview'

const ShowIconOption: React.FC = () => {
  return (
    <DeniReactTreeView 
      url="https://raw.githubusercontent.com/denimar/deni-react-treeview/develop/src/assets/data/countries.json" 
      showIcon={ false } 
    />
  )  
}

export default ShowIconOption
```
