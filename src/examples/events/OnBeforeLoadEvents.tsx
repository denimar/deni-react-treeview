import React, { useRef } from 'react'
import DeniReactTreeView from '../../components';

const OnBeforeLoadEvents: React.FC = () => {
  const treeviewRef = useRef<DeniReactTreeView>(null);

  const loadButtonClick = () => treeviewRef.current?.api.load()
  const onBeforeLoad = (data, item) => alert(`onBeforeLoad event: ${new Date()}`)
  const onAfterLoad = (data, item) => alert(`onAfterLoad event: ${new Date()}`)

  return (
    <div>
      <button onClick={ loadButtonClick } style={{ marginBottom: '5px' }}>Click to Load</button>
      <DeniReactTreeView 
        ref={ treeviewRef }
        autoLoad={ false } 
        json="https://denifakedata.herokuapp.com/tree/countries"  
        onBeforeLoad={ onBeforeLoad }
        onAfterLoad={ onAfterLoad }
      />
    </div>
  )
}

export default OnBeforeLoadEvents