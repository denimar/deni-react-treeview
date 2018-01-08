import React from 'react';
import TreeView from '../../../../../src/deni-react-treeview/deni-react-treeview';
require('./ApiTests.scss')
import FaTrashO from 'react-icons/lib/fa/trash-o';
import FaEdit from 'react-icons/lib/fa/edit';


class ApiTests extends React.Component {

  deleteItemClick(id) {
    this.refs.treeview.api.removeItem(id);
  }

  editItemClick(id) {
    alert('editing routine here...')
  }

  onRenderItem(item, treeview) {
    return (
      <div className="treeview-item-example">
        <span className="treeview-item-example-text">{item.text}</span>
        <span className="actionButton trash" onClick={this.deleteItemClick.bind(this, item.id)}><FaTrashO size="15" /></span>
        <span className="actionButton edit" onClick={this.editItemClick.bind(this)}><FaEdit size="15" /></span>
      </div>
    )
  }

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
            ref="treeview"
            url="https://denifakedata.herokuapp.com/tree/countries"
            selectRow={true}
            onRenderItem={this.onRenderItem.bind(this)}
          />

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
