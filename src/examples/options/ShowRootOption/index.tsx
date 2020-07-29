import React from 'react'
import DeniReactTreeView from '../../../components'

const ShowRootOption: React.FC = () => {
  return (
    <DeniReactTreeView 
      url="https://raw.githubusercontent.com/denimar/fakedata/master/data/trees/countries.json" 
      showRoot={ true } 
    />
  )  
}

export default ShowRootOption