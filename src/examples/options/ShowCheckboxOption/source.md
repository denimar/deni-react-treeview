```javascript
import React from 'react'
import DeniReactTreeView from 'deni-react-treeview'

const ShowCheckboxOption: React.FC = () => {
  return (
    <DeniReactTreeView 
      url="https://raw.githubusercontent.com/denimar/fakedata/master/data/trees/countries.json" 
      showCheckbox={ true } 
    />
  )  
}

export default ShowCheckboxOption
```
