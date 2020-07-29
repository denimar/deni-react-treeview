import React from 'react'
import { storiesOf } from '@storybook/react';
import PredefinedThemes from './PredefinedThemes'
import CustomizedTheme from './CustomizedTheme'

storiesOf('1 - Theming', module)  
  .add('predefined themes', () => <PredefinedThemes />, { notes: require('./PredefinedThemes/source.md').default })
  .add('customized theme', () => <CustomizedTheme />, { notes: require('./CustomizedTheme/source.md').default })