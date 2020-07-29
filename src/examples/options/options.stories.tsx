import React from 'react'
import { storiesOf } from '@storybook/react';
import DeniReactTreeView from '../../components';
import AutoLoadFalseOption from './AutoLoadFalseOption'
import ActionButtonsOption from './ActionButtonsOption'
import LazyLoadTrueOption from './LazyLoadTrueOption'
import MarginItemsOption from './MarginItemsOption'
import SelectRowOption from './SelectRowOption'
import ShowCheckboxOption from './ShowCheckboxOption'
import ShowIconOption from './ShowIconOption'
import ShowRootOption from './ShowRootOption'
import ThemeOption from './ThemeOption'

const countriesURL = 'https://raw.githubusercontent.com/denimar/deni-react-treeview/develop/src/assets/data/countries.json'

storiesOf('3 - Options', module)  
  .add('autoLoad = false', () => <AutoLoadFalseOption />, { notes: require('./AutoLoadFalseOption/source.md').default })
  .add('lazyLoad = true', () => <LazyLoadTrueOption />, { notes: require('./LazyLoadTrueOption/source.md').default })
  .add('marginItems = 80', () => <MarginItemsOption />, { notes: require('./MarginItemsOption/source.md').default })
  .add('selectRow = true', () => <SelectRowOption />, { notes: require('./SelectRowOption/source.md').default })
  .add('showCheckbox = true', () => <ShowCheckboxOption />, { notes: require('./ShowCheckboxOption/source.md').default })
  .add('showIcon = false', () => <ShowIconOption />, { notes: require('./ShowIconOption/source.md').default })
  .add('showRoot = true', () => <ShowRootOption />, { notes: require('./ShowRootOption/source.md').default })
  .add('theme = "metro"', () => <ThemeOption />, { notes: require('./ThemeOption/source.md').default })
  .add('actionButtons', () => <ActionButtonsOption />, { notes: require('./ThemeOption/source.md').default })