import React from 'react';
import TreeView from '../../../../src/deni-react-treeview/deni-react-treeview';
require('./ApiTests.scss')

class ApiTests extends React.Component {

  addItemClick() {
    this.refs.treeview.api.addItem('Denimar Test', false);
  }

  getRootItemClick() {
    console.log(this.refs.treeview.api.getRootItem());
  }

  getItemsClick() {
    console.log(this.refs.treeview.api.getItems());
  }
  render() {

    return (
      <div className="api-tests-viewport">
        <div className="body">
          <TreeView ref="treeview" url="https://denimar.github.io/static-data/countries.json" />
          <div className="buttons">
            <button onClick={this.addItemClick.bind(this)} >Add Item</button>
            <button onClick={this.getRootItemClick.bind(this)} >Get Root Item</button>
            <button onClick={this.getItemsClick.bind(this)} >Get Items</button>
          </div>
        </div>
      </div>
    )

  }

}

export default ApiTests;
