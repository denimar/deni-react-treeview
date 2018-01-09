import React from 'react'
import TreeView from '../../../../src/deni-react-treeview/deni-react-treeview'
import './PredefinedThemes.scss'

let jsonUrl = 'https://denifakedata.herokuapp.com/tree/countries';

class Example extends React.Component {

  render() {

    return (
      <div className="predefined-themes-example">
        <TreeView showCheckbox={true} json={ jsonUrl } />
        <TreeView showCheckbox={true} theme="metro" json={ jsonUrl } />
        <TreeView showCheckbox={true} theme="moonlight" json={ jsonUrl } />
        <TreeView showCheckbox={true} theme="purple" json={ jsonUrl } />
        <TreeView showCheckbox={true} theme="green" json={ jsonUrl } />
        <TreeView showCheckbox={true} theme="orange" json={ jsonUrl } />
        <TreeView showCheckbox={true} theme="red" json={ jsonUrl } />
        <TreeView showCheckbox={true} theme="silver" json={ jsonUrl } />
      </div>
    );

  }

}

export default Example;
