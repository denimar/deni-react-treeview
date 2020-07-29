/* eslint-disable react/display-name */
import React from 'react';
import { storiesOf } from '@storybook/react';

import OnSelectItemEvent from './OnSelectItemEvent'
import OnRenderItemEvent from './OnRenderItemEvent'
import OnBeforeLoadEvent from './OnBeforeLoadEvent'
import OnAfterLoadEvent from './OnAfterLoadEvent'
import ExampleUnderConstruction from '../ExampleUnderConstruction';

storiesOf('5 - Events', module)  
  .add('onRenderItem', () => <OnRenderItemEvent />, { notes: require('./OnRenderItemEvent/source.md').default })
  .add('onBeforeLoad', () => <OnBeforeLoadEvent />, { notes: require('./OnBeforeLoadEvent/source.md').default })
  .add('onAfterLoad', () => <OnAfterLoadEvent />, { notes: require('./OnAfterLoadEvent/source.md').default })
  .add('onSelectItem', () => <OnSelectItemEvent />, { notes: require('./OnSelectItemEvent/source.md').default })
  .add('onExpanded', () => <ExampleUnderConstruction />)
  .add('onColapsed', () => <ExampleUnderConstruction />)
  .add('onLazyLoad (manual lazy load)', () => <ExampleUnderConstruction />)