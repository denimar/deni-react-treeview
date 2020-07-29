import React from 'react'
import DeniReactTreeView from '../../../components'

const OnSelectItemEvent: React.FC = () => {
  const onSelectItemHandler = item => alert(`onSelectItem - item : ${item.text}`)

  return (
    <DeniReactTreeView 
      json="./data/countries-by-continents.json" 
      onSelectItem={ onSelectItemHandler }
    />
  )
}

export default OnSelectItemEvent