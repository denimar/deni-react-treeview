/* eslint-disable react/display-name */
import React from 'react';
import { storiesOf } from '@storybook/react';
import DeniReactTreeView from '../../components/deni-react-treeview/DeniReactTreeView'
import OnRenderrItemsEvents from './OnRenderrItemsEvents'
import OnBeforeLoadEvents from './OnBeforeLoadEvents'
import ExampleUnderConstruction from '../ExampleUnderConstruction';

const onSelectItemHandler = item => alert(`onSelectItem - item : ${item.text}`)

storiesOf('5 - Events', module)  
// .add('onRenderItem', () => <OnRenderrItemsEvents />)
// .add('onBeforeLoad', () => <OnBeforeLoadEvents />)
// .add('onAfterLoad', () => <ExampleUnderConstruction />)
  .add('onSelectItem', () => <DeniReactTreeView json="./data/countries-by-continents.json" onSelectItem={ onSelectItemHandler } />)
// .add('onExpanded', () => <ExampleUnderConstruction />)
// .add('onColapsed', () => <ExampleUnderConstruction />)
// .add('onLazyLoad (manual lazy load)', () => <ExampleUnderConstruction />)

/*

export default { title: '5 - Events' }

export const toALocalJson = () => <DeniReactTreeView json="./data/countries-by-continents.json" />


const onSelectItemHandler = item => alert(`onSelectItem - item : ${item.text}`)
export const onSelectItem = <DeniReactTreeView json="./data/countries-by-continents.json" onSelectItem={ onSelectItemHandler } />

//export const onSelectItem = { title: 'onSelectItem', component: <DeniReactTreeView json="./data/countries-by-continents.json" onSelectItem={ onSelectItemHandler } />  }


*/