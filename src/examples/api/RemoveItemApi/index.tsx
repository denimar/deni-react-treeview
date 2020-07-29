import React, { useRef } from 'react'
import DeniReactTreeView from '../../../components'

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
        url="https://raw.githubusercontent.com/denimar/deni-react-treeview/develop/src/assets/data/countries.json" 
      />
    </div>
  )
}

export default RemoveItemApi