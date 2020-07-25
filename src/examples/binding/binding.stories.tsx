import React from 'react';
import DeniReactTreeView from '../../components/deni-react-treeview/DeniReactTreeView'

export default { title: '2 - Binding' }

export const toALocalJson = () => <DeniReactTreeView json="./data/countries-by-continents.json" />

export const toARemoteJson = () => <DeniReactTreeView expandAll={true} url="https://denifakedata.herokuapp.com/tree/countries" />

export const toARemoteJsonInLazyLoad = () => <DeniReactTreeView url="https://denifakedata.herokuapp.com/tree/countries" lazyLoad={ true } />

export const toAJavaScriptObject = () => <DeniReactTreeView items={ fruitsAndVegetables } />

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