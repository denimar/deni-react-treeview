import React, { useRef } from 'react'
import DeniReactTreeView from '../../../components';

const OnBeforeLoadEvent: React.FC = () => {
  const treeviewRef = useRef<DeniReactTreeView>(null);

  const loadButtonClick = () => treeviewRef.current?.api.load()
  const onBeforeLoad = (data, item) => alert(`onBeforeLoad event: ${new Date()}`)

  return (
    <div>
      <button onClick={ loadButtonClick } style={{ marginBottom: '5px' }}>Click to Load</button>
      <DeniReactTreeView 
        ref={ treeviewRef }
        autoLoad={ false } 
        url="https://raw.githubusercontent.com/denimar/deni-react-treeview/develop/src/assets/data/countries.json" 
        onBeforeLoad={ onBeforeLoad }
      />
    </div>
  )
}

export default OnBeforeLoadEvent