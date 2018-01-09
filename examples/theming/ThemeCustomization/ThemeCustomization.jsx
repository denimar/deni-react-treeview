import React from 'react'
import TreeView from '../../../../src/deni-react-treeview/deni-react-treeview'
import './ThemeCustomization.scss'

class Example extends React.Component {

  render() {

    return (
      <div className="theme-customization">
        <TreeView className="treeview-teste" url="https://denifakedata.herokuapp.com/tree/dogs"
      />
      </div>
    );

  }

}

export default Example;
