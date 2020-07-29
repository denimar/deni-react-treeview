```javascript
import React, { useRef } from 'react'
import DeniReactTreeView from 'deni-react-treeview'

const AddItemAndSubitemApi: React.FC = () => {
  const treeviewRef = useRef<DeniReactTreeView>(null)

  const addItemAndSubItem = () => {
    const api = treeviewRef.current.api
    const rootNode = api.getRootItem();

    const newItem = api.addItem("New Item", false, rootNode);
    const newSubItem = api.addItem("New Sub Item", true, newItem);

    api.selectItem(newSubItem);
  }

  return (
    <div>
      <button onClick={ addItemAndSubItem }>Click to Add an Item and SubItem</button>
      <DeniReactTreeView 
        ref={ treeviewRef }
        url="https://raw.githubusercontent.com/denimar/fakedata/master/data/trees/countries.json" 
      />
    </div>
  )
}

export default AddItemAndSubitemApi
```
