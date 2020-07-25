import React from 'react';
import { storiesOf } from '@storybook/react';
import DeniReactTreeView from '../../components';
import AutoLoadFalseOption from './AutoLoadFalseOption'
import ActionButtonsOption from './ActionButtonsOption'

storiesOf('1 - Options', module)
  .add('autoLoad = false', () => <AutoLoadFalseOption /> )
  .add('lazyLoad = true', () => <DeniReactTreeView url="https://denifakedata.herokuapp.com/tree/countries" lazyLoad={ true } />)
  .add('marginItems = 80', () => <DeniReactTreeView json="https://denifakedata.herokuapp.com/tree/countries" marginItems="80" />)
  .add('selectRow = true', () => <DeniReactTreeView json="https://denifakedata.herokuapp.com/tree/countries" selectRow={ true } />)  
  .add('showCheckbox = true', () => <DeniReactTreeView json="https://denifakedata.herokuapp.com/tree/countries" showCheckbox={ true } />)  
  .add('showIcon = false', () => <DeniReactTreeView json="https://denifakedata.herokuapp.com/tree/countries" showIcon={ false } />)  
  .add('showRoot = true', () => <DeniReactTreeView json="https://denifakedata.herokuapp.com/tree/countries" showRoot={ true } />)  
  .add('theme = "metro"', () => <DeniReactTreeView json="https://denifakedata.herokuapp.com/tree/countries" theme="metro" />)  
  .add('actionButtons', () => <ActionButtonsOption />)
  
  