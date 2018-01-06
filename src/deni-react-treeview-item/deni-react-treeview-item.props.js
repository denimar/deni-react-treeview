import PropTypes from 'prop-types';

module.exports = {

  propTypes: {
    treeview: PropTypes.object.isRequired,
    item: PropTypes.object,
    level: PropTypes.number.isRequired
  },

  defaultProps: {
  }
}
