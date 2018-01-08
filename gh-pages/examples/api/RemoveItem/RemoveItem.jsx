import React from 'react';
import TreeView from '../../../../src/deni-react-treeview/deni-react-treeview';

class Example extends React.Component {

  addItemAndSubItem() {
    let api = this.refs.treeview.api;

    let selectedItem = api.getSelectedItem();

    if (selectedItem) {
      api.removeItem(selectedItem.id);
    } else {
      alert('You have to select a item to remove it');
    }
  }

  render() {
  	return (
      <div>
        <button onClick={ this.addItemAndSubItem.bind(this) }>Click to remove the select item</button>
        <TreeView
          ref="treeview"
          json="https://denifakedata.herokuapp.com/tree/countries"
        />
      </div>
    )
  }

}

export default Example;
