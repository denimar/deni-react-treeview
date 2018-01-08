import React from 'react';
import TreeView from '../../../../src/deni-react-treeview/deni-react-treeview';

class Example extends React.Component {

  addItemAndSubItem() {
    let api = this.refs.treeview.api;
    let rootNode = api.getRootItem();

    let newItem = api.addItem("New Item", false, rootNode);
    let newSubItem = api.addItem("New Sub Item", true, newItem);

    api.selectItem(newSubItem);
  }

  render() {
  	return (
      <div>
        <button onClick={ this.addItemAndSubItem.bind(this) }>Click to Add an Item and SubItem</button>
        <TreeView
          ref="treeview"
          json="https://denifakedata.herokuapp.com/tree/countries"
        />
      </div>
    )
  }

}

export default Example;
