import React from 'react'
import DeniReactTreeView from '../../../components'

const LazyLoadTrueOption: React.FC = () => {
  return <DeniReactTreeView url="https://denifakedata.herokuapp.com/tree/countries" lazyLoad={ true } />
}

export default LazyLoadTrueOption