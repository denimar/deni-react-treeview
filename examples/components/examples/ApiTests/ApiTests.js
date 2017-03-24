import React from 'react';
import TreeView from '../../../../src/deni-react-treeview/deni-react-treeview';
require('./ApiTests.scss')
import FaTrashO from 'react-icons/lib/fa/trash-o';
import FaEdit from 'react-icons/lib/fa/edit';
//import MdEdit from 'react-icons/lib/md/edit';


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

  onActionButtonClick(buttonName) {
    console.log(buttonName)
    switch (buttonName) {
      case 'fa/trash-o':
        alert('trash: implement here')
        break;
      case 'fa/edit':
        alert('editing: implement here')
        break;
      default:
    }
  }

  render() {

    return (
      <div className="api-tests-viewport">
        <div className="body">
          <TreeView
            ref="treeview"
            url="https://denimar.github.io/static-data/countries.json"
            selectRow={true}
            onRenderItem={this.onRenderItem.bind(this)}
          />

          <TreeView
            url="https://denimar.github.io/static-data/countries.json"
            selectRow={true}
            actionButtons={[
              {
                name: 'fa/trash-o',
                color: '#ff6666'
              },
              'fa/edit',
              'fa/bar-chart'
            ]}
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
