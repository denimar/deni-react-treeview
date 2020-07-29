import React from 'react'
import DeniReactTreeView from "../../../components"

const ToARemoteJsonInLazyLoad = () => {
  return <DeniReactTreeView url="https://denifakedata.herokuapp.com/tree/countries" lazyLoad={ true } />
}

export default  ToARemoteJsonInLazyLoad