```javascript
import React from 'react'
import DeniReactTreeView from 'deni-react-treeview'

const ShowIconOption: React.FC = () => {
  return (
    <DeniReactTreeView 
      url="https://raw.githubusercontent.com/denimar/fakedata/master/data/trees/countries.json" 
      showIcon={ false } 
    />
  )  
}

export default ShowIconOption
```
