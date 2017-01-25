import React from 'react';
import TreeView from '../src/deni-react-treeview/deni-react-treeview';
import countries from './data/countries-by-continents.json'

class Example extends React.Component{

  constructor(props) {
    super(props);
  }

  onSelectItem(item) {
    console.log(item);
  }

  render() {

    return (
      <TreeView items={countries} onSelectItem={this.onSelectItem}></TreeView>
    );
  }

}

export default Example;
