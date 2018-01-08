import React from 'react';
import TreeView from '../../deni-react-treeview/deni-react-treeview';

class Example extends React.Component {

  render() {
    return (
      <TreeView json="https://denifakedata.herokuapp.com/tree/countries" showRoot={ true } />
    );
  }

}

export default Example;
