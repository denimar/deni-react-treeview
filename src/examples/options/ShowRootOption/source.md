```javascript
import React from 'react'
import DeniReactTreeView from 'deni-react-treeview'

const ShowRootOption: React.FC = () => {
  return (
    <DeniReactTreeView 
      url="https://raw.githubusercontent.com/denimar/fakedata/master/data/trees/countries.json" 
      showRoot={ true } 
    />
  )  
}

export default ShowRootOption
```
