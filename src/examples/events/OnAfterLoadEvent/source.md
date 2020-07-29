```javascript
import React, { useRef } from 'react'
import DeniReactTreeView from 'deni-react-treeview';

const OnAfterLoadEvent: React.FC = () => {
  const treeviewRef = useRef<DeniReactTreeView>(null);

  const loadButtonClick = () => treeviewRef.current.api.load()
  const onAfterLoad = (data, item) => alert(`onAfterLoad event: ${new Date()}`)

  return (
    <div>
      <button onClick={ loadButtonClick } style={{ marginBottom: '5px' }}>Click to Load</button>
      <DeniReactTreeView 
        ref={ treeviewRef }
        autoLoad={ false } 
        url="https://bit.ly/337lQK4" 
        onAfterLoad={ onAfterLoad }
      />
    </div>
  )
}

export default OnAfterLoadEvent
```
