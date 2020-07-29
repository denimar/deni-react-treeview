import React from 'react';
import { storiesOf } from '@storybook/react';

import ExampleUnderConstruction from '../ExampleUnderConstruction'

import AddItemAndSubitemApi from './AddItemAndSubitemApi'
import RemoveItemApi from './RemoveItemApi'

storiesOf('4 - Api', module)
  .add('addItem and subitem', () => <AddItemAndSubitemApi />, { notes: require('./AddItemAndSubitemApi/source.md').default })
  .add('remove item', () => <RemoveItemApi />, { notes: require('./RemoveItemApi/source.md').default })
  .add('find folder', () => <ExampleUnderConstruction /> )
  .add('find node', () => <ExampleUnderConstruction /> )
  .add('find item', () => <ExampleUnderConstruction /> )
  .add('getItems()', () => <ExampleUnderConstruction /> )
  .add('getParentNode(item)', () => <ExampleUnderConstruction /> )
  .add('getRootItem()', () => <ExampleUnderConstruction /> )  
  .add('getSelectedItem()', () => <ExampleUnderConstruction /> )  
  .add('load()', () => <ExampleUnderConstruction /> )    
  .add('loadData(data)', () => <ExampleUnderConstruction /> )    
  .add('selectItem(item)', () => <ExampleUnderConstruction /> )    
  .add('setTheme(newTheme)', () => <ExampleUnderConstruction /> )    
  
  