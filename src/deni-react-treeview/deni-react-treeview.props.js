import PropTypes from 'prop-types';

module.exports = {

    propTypes: {
        autoLoad: PropTypes.bool,
        items: PropTypes.oneOfType([
            PropTypes.array,
            PropTypes.object
        ]),
        lazyLoad: PropTypes.bool,
        marginItems: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number
        ]),
        onAfterLoad: PropTypes.func,
        onBeforeLoad: PropTypes.func,
        onRenderItem: PropTypes.func,
        onSelectItem: PropTypes.func,
        onCheckItem: PropTypes.func,
        selectRow: PropTypes.bool,
        showCheckbox: PropTypes.bool,
        showIcon: PropTypes.bool,
        showRoot: PropTypes.bool,
        theme: PropTypes.string,
        url: PropTypes.string,
    },

    defaultProps: {
        autoLoad: true,
        lazyLoad: false,
        marginItems: 30,
        selectRow: false,
        showCheckbox: false,
        showIcon: true,
        showRoot: false,
        theme: 'classic',
    },
}
