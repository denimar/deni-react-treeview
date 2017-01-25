import React from 'react';
import TreeView from '../src/deni-react-treeview/deni-react-treeview';
import countries from './data/countries-by-continents.json'

class Example extends React.Component{

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <TreeView items={countries} ></TreeView>
    );
  }

}

export default Example;
