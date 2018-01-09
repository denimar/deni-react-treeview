import React from 'react';
import TreeView from '../../../../src/deni-react-treeview/deni-react-treeview';
import FaTrashO from 'react-icons/lib/fa/trash-o';
import FaEdit from 'react-icons/lib/fa/edit';

class Example extends React.Component {

  onActionButtonClick(item, actionButton) {
    const buttonName = actionButton.type.name;

    switch (buttonName) {
      case 'FaTrashO':
        alert('Action: trash, Item: ' + item.text);
        break;
      case 'FaEdit':
        alert('Action: edit, Item: ' + item.text);
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
      <TreeView
        url="https://denifakedata.herokuapp.com/tree/countries"
        selectRow={ true }
        actionButtons={ actionButtons }
        onActionButtonClick={ this.onActionButtonClick }
      />
    )
  }

}

export default Example;
