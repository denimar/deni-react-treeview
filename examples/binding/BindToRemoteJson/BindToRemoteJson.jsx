import React from 'react';
import TreeView from '../../../../src/deni-react-treeview/deni-react-treeview';

class Example extends React.Component {

  render() {
    return (
      <TreeView url="https://denifakedata.herokuapp.com/tree/countries" />
    );

  }

}

export default Example;
