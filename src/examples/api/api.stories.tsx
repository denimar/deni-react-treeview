import React from 'react';
import { storiesOf } from '@storybook/react';
import AddItemAndSubitemApi from './AddItemAndSubitemApi'
import RemoveItemApi from './RemoveItemApi'
import ExampleUnderConstruction from '../ExampleUnderConstruction'

storiesOf('Api', module)
  .add('addItem and subitem', () => <AddItemAndSubitemApi /> )
  .add('remove item', () => <RemoveItemApi /> )
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
  
  