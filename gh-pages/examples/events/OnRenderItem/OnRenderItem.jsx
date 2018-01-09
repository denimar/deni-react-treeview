import React from 'react';
import TreeView from '../../../../src/deni-react-treeview/deni-react-treeview';
import FaTrashO from 'react-icons/lib/fa/trash-o';
import FaEdit from 'react-icons/lib/fa/edit';
import './OnRenderItem.scss';

class Example extends React.Component {

  onRenderItem(item, treeview) {
    return (
      <div className="treeview-item-example">
        <span className="treeview-item-example-text">{item.text}</span>
        <span className="actionButton trash" onClick={this.deleteItemClick.bind(this, item.id)}><FaTrashO size="15" /></span>
        <span className="actionButton edit" onClick={this.editItemClick.bind(this)}><FaEdit size="15" /></span>
      </div>
    )
  }

  deleteItemClick(id) {
    this.refs.treeview.api.removeItem(id);
  }

  editItemClick(id) {
    alert('editing routine here...')
  }

  render() {
  	return (
      <TreeView
        className="onrenderitem-example"
        ref="treeview"
        url="https://denifakedata.herokuapp.com/tree/countries"
        selectRow={ true }
        onRenderItem={ this.onRenderItem.bind(this) }
      />
    )
  }

}

export default Example;
