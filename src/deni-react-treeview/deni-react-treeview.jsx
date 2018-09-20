import React from 'react';
import './deni-react-treeview.scss'
import DeniReactTreeViewItem from '../deni-react-treeview-item/deni-react-treeview-item'
import treeviewHelper from './deni-react-treeview.helper'
import treeviewProps from './deni-react-treeview.props'
import treeviewApiFn from './deni-react-treeview.api'

class DeniReactTreeView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      theme: props.theme
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.items !== this.props.items) {
      this.state.rootItem.children = this.props.items
      //treeviewHelper.loadData.call(this, this.props.items);
    }
  }

  componentDidMount() {
    this.api = treeviewApiFn(this);
    treeviewHelper.setTheme(this, this.props.theme);
    treeviewHelper.loadingSetup(this);
  }

  render() {
    let self = this;
    let domTreeviewItem = (<DeniReactTreeViewItem root={true} treeview={self} level={0} item={this.state.rootItem} />);
    let children = this.state.rootItem && this.state.rootItem.children;
    if (children && children.length === 0) {
      if (this.props.items && this.props.items.length > 0) {
        children = this.props.items;
      }
    }
    let className = 'deni-react-treeview-container unselectable ' + self.state.theme;
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    let hasItems = (children !== undefined && children.length > 0);
    if (this.state.loading && (!this.props.lazyLoad || !hasItems)) {
      className += ' loading';
    }
    let showComponent = hasItems && (!this.state.loading || this.props.lazyLoad);

    return (
      (showComponent) ? (
        <div className={ className } >
          {domTreeviewItem}
          {_createComponentsChildren(self, domTreeviewItem, 1, children)}
        </div>
      ) : <div className={ className }></div>
    )
  }

}

//DeniReactTreeView.propTypes = treeviewProps.propTypes;
DeniReactTreeView.defaultProps = treeviewProps.defaultProps;

function _createComponentsChildren (treeview, parent, level, children) {
  return (
    <div>
      {
        (parent.props.item && parent.props.item.expanded && children && children.length) ?
          children.map(function(child) {
            let domTreeviewItem = <DeniReactTreeViewItem treeview={treeview} parent={parent} level={level} key={child.id} item={child} />;
            return (
              <div key={child.id}>
                { domTreeviewItem }
                { _createComponentsChildren(treeview, domTreeviewItem, level+1, child.children) }
              </div>
            )
          })
          : undefined
      }
    </div>
  );
}

export default DeniReactTreeView;
