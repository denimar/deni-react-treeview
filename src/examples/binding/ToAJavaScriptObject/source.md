```javascript
import React from 'react'
import DeniReactTreeView from 'deni-react-treeview'

const ToAJavaScriptObject = () => {
  return <DeniReactTreeView items={ fruitsAndVegetables } />
}

const fruitsAndVegetables = [
    {
      id: 100,
      text: 'Fruits',
      children: [
        {
          id: 101,
          text: 'Orange',
          isLeaf: true
        },
        {
          id: 102,
          text: 'Banana',
          isLeaf: true
        }
      ]
    },
    {
      id: 200,
      text: 'Vegetables',
      children: [
        {
          id: 201,
          text: 'Carrot',
          isLeaf: true
        },
        {
          id: 202,
          text: 'Tomato',
          isLeaf: true
        }
      ]
    }
  ];  

export default ToAJavaScriptObject
```
