import React from 'react';
import DeniReactTreeView from '../../components/deni-react-treeview/DeniReactTreeView'
import './theming-customizations.scss'

const themes = [ 'classic', 'metro', 'moonlight', 'purple', 'green', 'orange', 'red', 'silver' ]

export default { title: 'Theming' }

export const PredefinedThemes = () => (
  <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }} >
    { 
      themes.map((theme, index) => {
        return <DeniReactTreeView 
          style={{ marginRight: '10px', marginBottom: '10px' }}
          key={index} 
          showCheckbox={true} 
          theme={theme} 
          json="./data/countries-by-continents.json" 
        />
      })
      }
  </div>  
)

export const customizedTheme = () => <div className="theme-customization"><DeniReactTreeView className="treeview-teste" url="https://denifakedata.herokuapp.com/tree/dogs" /></div>