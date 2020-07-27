import React from 'react';
import DeniReactTreeView from '../../components/deni-react-treeview/DeniReactTreeView'
import './theming-customizations.scss'

const themes = [ 'classic', 'metro', 'moonlight', 'purple', 'green', 'orange', 'red', 'silver' ]

export default { title: '1 - Theming' }

export const PredefinedThemes = () => (
  <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }} >
    { 
      themes.map((theme, index) => {
        return <DeniReactTreeView 
          style={{ marginRight: '10px', marginBottom: '10px' }}
          key={index} 
          showCheckbox={true} 
          theme={theme} 
          url="https://raw.githubusercontent.com/denimar/fakedata/master/data/trees/countries-by-continents.json"
        />
      })
      }
  </div>  
)

export const customizedTheme = () => {
  return (
    <div className="theme-customization">
      <DeniReactTreeView 
        className="treeview-teste" 
        url="https://raw.githubusercontent.com/denimar/fakedata/master/data/trees/dogs.json">
      </DeniReactTreeView>
    </div>
  )  
}  