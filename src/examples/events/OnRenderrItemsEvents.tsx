import React, { useRef } from 'react'
import { FaTrash, FaEdit } from 'react-icons/fa';
import DeniReactTreeView from '../../components'
import './OnRenderItemsEvents.scss'

const OnRenderrItemsEvents: React.FC = () => {
  const treeviewRef = useRef<DeniReactTreeView>(null)

  const deleteItemClick = id => {
    if (treeviewRef.current) treeviewRef.current.api.removeItem(id);
  }

  const editItemClick = item => {
    alert('Edit item: ' + JSON.stringify(item, null, 2))
  }

  const onRenderItem = (item, treeview) => {
    return (
      <div className="treeview-item-example">
        <span className="treeview-item-example-text">{item.text}</span>
        <span className="actionButton trash" onClick={() => deleteItemClick(item.id)}><FaTrash size="15" /></span>
        <span className="actionButton edit" onClick={() => editItemClick(item)}><FaEdit size="15" /></span>
      </div>
    )
  }

  return (
    <DeniReactTreeView
      className="onrenderitem-example"
      ref={ treeviewRef }
      url="https://denifakedata.herokuapp.com/tree/countries"
      selectRow={ true }
      onRenderItem={ onRenderItem }
    />
  )
}

export default OnRenderrItemsEvents