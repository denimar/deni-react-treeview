import {PropTypes} from 'react';

module.exports = {

  propTypes: {
    treeview: PropTypes.object.isRequired,
    item: PropTypes.object,
    level: PropTypes.number.isRequired
  },

  defaultProps: {
  }
}
