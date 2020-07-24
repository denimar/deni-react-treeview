import React, { useRef } from 'react'
import DeniReactTreeView from '../../components';

const OnBeforeLoadEvents: React.FC = () => {
  const treeviewRef = useRef<DeniReactTreeView>(null);

  const loadButtonClick = () => treeviewRef.current?.api.load()
  const onBeforeLoad = (data, item) => alert(`Message comming from onBeforeLoad event: ${new Date()}`)

  return (
    <div>
      <button onClick={ loadButtonClick }>Click to Load</button>
      <DeniReactTreeView 
        ref={ treeviewRef }
        autoLoad={ false } 
        json="https://denifakedata.herokuapp.com/tree/countries"  
        onBeforeLoad={ onBeforeLoad }
      />
    </div>
  )
}

export default OnBeforeLoadEvents