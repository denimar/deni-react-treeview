import React from 'react';
import { storiesOf } from '@storybook/react';
import DeniReactTreeView from '../../components/deni-react-treeview/DeniReactTreeView'
import OnRenderrItemsEvents from './OnRenderrItemsEvents'
import OnBeforeLoadEvents from './OnBeforeLoadEvents'

storiesOf('4 - Events', module)  
.add('onRenderItem', () => <OnRenderrItemsEvents />)
.add('onBeforeLoad', () => <OnBeforeLoadEvents />)
.add('onAfterLoad', () => <DeniReactTreeView expandAll={true} url="https://denifakedata.herokuapp.com/tree/countries" />)
.add('onSelectItem', () => <DeniReactTreeView expandAll={true} url="https://denifakedata.herokuapp.com/tree/countries" />)
.add('onExpanded', () => <DeniReactTreeView expandAll={true} url="https://denifakedata.herokuapp.com/tree/countries" />)
.add('onColapsed', () => <DeniReactTreeView expandAll={true} url="https://denifakedata.herokuapp.com/tree/countries" />)
.add('onLazyLoad (manual lazy load)', () => <DeniReactTreeView expandAll={true} url="https://denifakedata.herokuapp.com/tree/countries" />)