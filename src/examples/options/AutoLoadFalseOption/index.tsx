import React, { useRef } from 'react'
import DeniReactTreeView from '../../../components'

const AutoLoadFalseOption: React.FC = () => {
  const treeviewRef = useRef<DeniReactTreeView>(null);
  const loadButtonClick = () => treeviewRef.current?.api.load()

  return (
    <div>
      <button onClick={ loadButtonClick } style={{ marginBottom: '5px' }}>Click to Load</button>
      <DeniReactTreeView 
        ref={ treeviewRef }
        autoLoad={ false } 
        json="https://raw.githubusercontent.com/denimar/deni-react-treeview/develop/src/assets/data/countries.json"  
      />
    </div>
  )

}

export default AutoLoadFalseOption