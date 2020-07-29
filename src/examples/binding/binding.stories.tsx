import React from 'react'
import { storiesOf } from '@storybook/react';
import ToALocalJson from './ToALocalJson'
import ToARemoteJson from './ToARemoteJson'
import ToARemoteJsonInLazyLoad from './ToARemoteJsonInLazyLoad'
import ToAJavaScriptObject from './ToAJavaScriptObject'

storiesOf('2 - Binding', module)  
  .add('to a local JSON', () => <ToALocalJson />, { notes: require('./ToALocalJson/source.md').default })
  .add('to a remote JSON', () => <ToARemoteJson />, { notes: require('./ToARemoteJson/source.md').default })  
  .add('to a remote JSON (Lazy Load)ddf', () => <ToARemoteJsonInLazyLoad />, { notes: require('./ToARemoteJsonInLazyLoad/source.md').default })  
  .add('to a Javascript Object', () => <ToAJavaScriptObject />, { notes: require('./ToAJavaScriptObject/source.md').default })  
