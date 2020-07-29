```javascript
import React, { useRef } from 'react'
import DeniReactTreeView from 'deni-react-treeview'

const AutoLoadFalseOption: React.FC = () => {
  const treeviewRef = useRef<DeniReactTreeView>(null);
  const loadButtonClick = () => treeviewRef.current.api.load()

  return (
    <div>
      <button onClick={ loadButtonClick } style={{ marginBottom: '5px' }}>Click to Load</button>
      <DeniReactTreeView 
        ref={ treeviewRef }
        autoLoad={ false } 
        json="https://denifakedata.herokuapp.com/tree/countries"  
      />
    </div>
  )

}

export default AutoLoadFalseOption
```
