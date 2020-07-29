import React from 'react'
import DeniReactTreeView from "../../../components"

const themes = [ 'classic', 'metro', 'moonlight', 'purple', 'green', 'orange', 'red', 'silver' ]

const PredefinedThemes = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }} >
      { 
        themes.map((theme, index) => {
          return <DeniReactTreeView 
            style={{ marginRight: '10px', marginBottom: '10px' }}
            key={index} 
            showCheckbox={true} 
            theme={theme} 
            url="https://bit.ly/3152dzY"
          />
        })
        }
    </div>     
  )
}  

export default PredefinedThemes