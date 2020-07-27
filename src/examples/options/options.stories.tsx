import React from 'react';
import { storiesOf } from '@storybook/react';
import DeniReactTreeView from '../../components';
import AutoLoadFalseOption from './AutoLoadFalseOption'
import ActionButtonsOption from './ActionButtonsOption'

const countriesURL = 'https://raw.githubusercontent.com/denimar/fakedata/master/data/trees/countries.json'

storiesOf('3 - Options', module)
  .add('autoLoad = false', () => <AutoLoadFalseOption /> )
  .add('lazyLoad = true', () => <DeniReactTreeView url={ countriesURL } lazyLoad={ true } />)
  .add('marginItems = 80', () => <DeniReactTreeView url={ countriesURL } marginItems="80" />)
  .add('selectRow = true', () => <DeniReactTreeView url={ countriesURL } selectRow={ true } />)  
  .add('showCheckbox = true', () => <DeniReactTreeView url={ countriesURL } showCheckbox={ true } />)  
  .add('showIcon = false', () => <DeniReactTreeView url={ countriesURL } showIcon={ false } />)  
  .add('showRoot = true', () => <DeniReactTreeView url={ countriesURL } showRoot={ true } />)  
  .add('theme = "metro"', () => <DeniReactTreeView url={ countriesURL } theme="metro" />)  
  .add('actionButtons', () => <ActionButtonsOption />)
  
  