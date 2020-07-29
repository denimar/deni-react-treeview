import React from 'react'
import DeniReactTreeView from "../../../components"

const ToARemoteJsonInLazyLoad = () => {
  return <DeniReactTreeView url="https://raw.githubusercontent.com/denimar/deni-react-treeview/develop/src/assets/data/countries.json" lazyLoad={ true } />
}

export default  ToARemoteJsonInLazyLoad