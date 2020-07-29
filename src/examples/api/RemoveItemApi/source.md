```javascript
import React, { useRef } from 'react'
import DeniReactTreeView from 'deni-react-treeview'

const RemoveItemApi: React.FC = () => {
  const treeviewRef = useRef<DeniReactTreeView>(null)

  const removeSelectedItem = () => {
    const api = treeviewRef.current?.api
    const selectedItem = api.getSelectedItem();

    if (selectedItem) {
      api.removeItem(selectedItem.id);
    } else {
      alert('You have to select a item to remove it');
    }
  }

  return (
    <div>
      <button onClick={ removeSelectedItem }>Click to remove the select item</button>
      <DeniReactTreeView 
        ref={ treeviewRef }
        url="https://bit.ly/337lQK4" 
      />
    </div>
  )
}

export default RemoveItemApi
```
