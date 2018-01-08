import React from 'react';
import TreeView from '../../../../src/deni-react-treeview/deni-react-treeview';

import './ApiTests.scss'
import FaTrashO from 'react-icons/lib/fa/trash-o';
import FaEdit from 'react-icons/lib/fa/edit';


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

  onActionButtonClick(item, actionButton) {
    const buttonName = actionButton.type.name;

    switch (buttonName) {
      case 'FaTrashO':
        alert('action: trash, item: ' + item.text);
        break;
      case 'FaEdit':
        alert('action: edit, item: ' + item.text);
        break;
      default:
    }
  }

  render() {

    const actionButtons = [
      (<FaTrashO size="15" color="#ff704d" />),
      (<FaEdit size="15" color="#245075" />)
    ];

    return (
      <div className="api-tests-viewport">
        <div className="body">
          <TreeView
            url="https://denifakedata.herokuapp.com/tree/countries"
            selectRow={true}
            actionButtons={actionButtons}
            onActionButtonClick={this.onActionButtonClick}
          />

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
