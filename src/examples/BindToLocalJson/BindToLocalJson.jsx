import React from 'react';
import TreeView from '../../deni-react-treeview/deni-react-treeview';

class Example extends React.Component {

  render() {
    return (
      <TreeView className="binding-to-local-json" json="./data/countries-by-continents.json" />
    );
  }

}

export default Example;
