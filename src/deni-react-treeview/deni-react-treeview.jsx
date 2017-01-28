import React from 'react';
import './deni-react-treeview.scss'
import DeniReactTreeViewItem from '../deni-react-treeview-item/deni-react-treeview-item'
import treeviewHelper from './deni-react-treeview.helper'
import props from './deni-react-treeview.props'
import treeviewApiFn from './deni-react-treeview.api'

class DeniReactTreeView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      theme: props.theme
    };
  }

  componentDidMount() {
    this.api = treeviewApiFn(this);

    this.setTheme(this.props.theme);
    treeviewHelper.loadingSetup(this);
  }

  setTheme = treeviewHelper.setTheme.bind(this);
  load = treeviewHelper.load;
  loadData = treeviewHelper.loadData.bind(this);

  render() {
    let self = this;

    if (this.state.rootItem) {
      let domTreeviewItem = <DeniReactTreeViewItem onExpanded={self.props.onExpanded} onColapsed={self.props.onColapsed} root={true} treeview={self} level={0} item={this.state.rootItem} />;

      return (
        <div className={'deni-react-treeview-container unselectable ' + self.state.theme}>
          {domTreeviewItem}
          {_createComponentsChildren(self, domTreeviewItem, 1, this.state.rootItem.children)}

        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }

}

DeniReactTreeView.propTypes = props.propTypes;
DeniReactTreeView.defaultProps = props.defaultProps;

function _createComponentsChildren (treeview, parent, level, children) {
  return (
    <div>
      {
        (parent.props.item.expanded && children && children.length) ?
          children.map(function(child) {
            let domTreeviewItem = <DeniReactTreeViewItem treeview={treeview} parent={parent} level={level} key={child.id} item={child} />;
            return (
              <div key={child.id}>
                {domTreeviewItem}
                {_createComponentsChildren(treeview, domTreeviewItem, level+1, child.children)}
              </div>
            )
          })
          : undefined
      }
    </div>
  );
}

export default DeniReactTreeView;
