import React from 'react';
import { storiesOf } from '@storybook/react';
import DeniReactTreeView from '../components/deni-react-treeview/DeniReactTreeView'

storiesOf('Binding', module)
  .add('to a local JSON', () => <DeniReactTreeView json="./data/countries-by-continents.json" />)
  .add('to a remote JSON', () => <DeniReactTreeView expandAll={true} url="https://denifakedata.herokuapp.com/tree/countries" />)
  .add('to a remote JSON (Lazy Load)', () => <DeniReactTreeView url="https://denifakedata.herokuapp.com/tree/countries" lazyLoad={ true } />)
  .add('to a Javascript object', () => <DeniReactTreeView items={ fruitsAndVegetables } />)

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