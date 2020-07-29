```javascript
import React from 'react'
import DeniReactTreeView from 'deni-react-treeview'

const LazyLoadTrueOption: React.FC = () => {
  return <DeniReactTreeView url="https://denifakedata.herokuapp.com/tree/countries" lazyLoad={ true } />
}

export default LazyLoadTrueOption
```
