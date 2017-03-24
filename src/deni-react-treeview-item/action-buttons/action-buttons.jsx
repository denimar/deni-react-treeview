import React from 'react'
import './action-buttons.scss'
import FaTrashO from 'react-icons/lib/fa/trash-o';
import FaEdit from 'react-icons/lib/fa/edit';

class ActionButtons extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="action-buttons-container">
        <span className="action-buttons-container-text">this.props.text</span>
        <span className="action-button trash" ><FaTrashO size="15" /></span>
        <span className="action-button edit" ><FaEdit size="15" /></span>
      </div>
    )
  }

}

export default ActionButtons;
