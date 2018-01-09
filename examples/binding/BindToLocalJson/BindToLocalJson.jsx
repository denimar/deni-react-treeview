import React from 'react';
import TreeView from '../../../../src/deni-react-treeview/deni-react-treeview';

class Example extends React.Component {

  render() {
    return (
      <TreeView json="./data/countries-by-continents.json" />
    );
    
  }

}

export default Example;
