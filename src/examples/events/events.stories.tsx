import React from 'react';
import { storiesOf } from '@storybook/react';
import DeniReactTreeView from '../../components/deni-react-treeview/DeniReactTreeView'
import OnRenderrItemsEvents from './OnRenderrItemsEvents'
import OnBeforeLoadEvents from './OnBeforeLoadEvents'
import ExampleUnderConstruction from '../ExampleUnderConstruction';

storiesOf('5 - Events', module)  
.add('onRenderItem', () => <OnRenderrItemsEvents />)
.add('onBeforeLoad', () => <OnBeforeLoadEvents />)
.add('onAfterLoad', () => <ExampleUnderConstruction />)
.add('onSelectItem', () => <ExampleUnderConstruction />)
.add('onExpanded', () => <ExampleUnderConstruction />)
.add('onColapsed', () => <ExampleUnderConstruction />)
.add('onLazyLoad (manual lazy load)', () => <ExampleUnderConstruction />)