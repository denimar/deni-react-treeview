import React from 'react'
import DeniReactTreeView from '../../components'
import { FaTrash, FaEdit } from 'react-icons/fa';

const ActionButtonsOption: React.FC = () => {

  const onActionButtonClick = (item, actionButton) => {
    debugger
    DEAL WITH THIS CLICK HERE ... NOT WORKING
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

  const actionButtons = [
    (<FaTrash key={1} size="15" color="#ff704d" />),
    (<FaEdit key={2} size="15" color="#245075" />)    
  ];

  return (
    <DeniReactTreeView
      url="https://denifakedata.herokuapp.com/tree/countries"
      selectRow={ true }
      actionButtons={ actionButtons }
      onActionButtonClick={ onActionButtonClick }
    />
  )
}

export default ActionButtonsOption