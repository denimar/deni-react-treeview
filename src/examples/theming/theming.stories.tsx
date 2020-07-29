import React from 'react'
import { storiesOf } from '@storybook/react';
import PredefinedThemes from './PredefinedThemes'
import CustomizedTheme from './CustomizedTheme'

storiesOf('1 - Theming', module)  
  .add('predefined themes', () => <PredefinedThemes />, { notes: require('./PredefinedThemes/source.md').default })
  .add('customized theme', () => <CustomizedTheme />, { notes: require('./CustomizedTheme/source.md').default })



// import React from 'react';
// import DeniReactTreeView from '../../components/deni-react-treeview/DeniReactTreeView'
// import './theming-customizations.scss'

// const themes = [ 'classic', 'metro', 'moonlight', 'purple', 'green', 'orange', 'red', 'silver' ]

// export default { 
//   title: '1 - Theming',
//   parameters: {
//     notes: { markdown }
//   },
// }

// export const PredefinedThemes = () => (
//   <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }} >
//     { 
//       themes.map((theme, index) => {
//         return <DeniReactTreeView 
//           style={{ marginRight: '10px', marginBottom: '10px' }}
//           key={index} 
//           showCheckbox={true} 
//           theme={theme} 
//           url="https://bit.ly/3152dzY"
//         />
//       })
//       }
//   </div>  
// )    

// export const customizedTheme = () => {
//   return (
//     <div className="theme-customization">
//       <DeniReactTreeView 
//         className="treeview-teste" 
//         url="https://raw.githubusercontent.com/denimar/fakedata/master/data/trees/dogs.json">
//       </DeniReactTreeView>
//     </div>
//   )  
// }  