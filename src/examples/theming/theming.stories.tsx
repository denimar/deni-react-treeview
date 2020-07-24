import React from 'react';
import { storiesOf } from '@storybook/react';
import DeniReactTreeView from '../../components/deni-react-treeview/DeniReactTreeView'
import './theming-customizations.scss'

const themes = [ 'classic', 'metro', 'moonlight', 'purple', 'green', 'orange', 'red', 'silver' ]

storiesOf('Theming', module)  
  .add('Predefined Themes', () => <div>{ 
    themes.map((theme, index) => {
      return <DeniReactTreeView 
        key={index} 
        showCheckbox={true} 
        theme={theme} 
        json="./data/countries-by-continents.json" 
      />
    })
  }
  </div>)
  .add('Customized Theme', () => <div className="theme-customization"><DeniReactTreeView className="treeview-teste" url="https://denifakedata.herokuapp.com/tree/dogs" /></div>)