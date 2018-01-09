import React from 'react';
import TreeView from '../../../../src/deni-react-treeview/deni-react-treeview';

class Example extends React.Component {

  render() {
    return (
      <TreeView json="https://denifakedata.herokuapp.com/tree/countries" showIcon={ false } />
    );
  }

}

export default Example;
