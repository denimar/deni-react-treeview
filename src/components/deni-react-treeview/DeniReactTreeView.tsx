import React from 'react';
import './DeniReactTreeView.scss'
import DeniReactTreeViewItem from '../deni-react-treeview-item/DeniReactTreeViewItem'
import { deniReactTreeviewApi } from './DeniReactTreeviewApi'
import { loadingSetup, setTheme } from './DeniReactTreeviewHelper'
import { DeniReactTreeviewProps } from './DeniReactTreeviewProps';


interface DeniReactTreeviewState {
  loading: boolean,  
  theme: string,
  expandAll?: boolean,
}

class DeniReactTreeView extends React.Component<DeniReactTreeviewProps, DeniReactTreeviewState> {
  api: any;
  container: any;

  constructor(props: DeniReactTreeviewProps) {
    super(props);
    this.state = {
      loading: false,
      theme: props.theme || 'classic',
      expandAll: props.expandAll,
    };
    this.expandAllFinished = this.expandAllFinished.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const { items } = this.props;
    const rootItem = this.api.getRootItem()
    if (prevProps.items !== items) {
      rootItem.children = items;
      //treeviewHelper.loadData.call(this, this.props.items);
    }
    if (prevState.rootItem !== rootItem && this.state.expandAll) {
      this.expandAllFinished();
    }
  }

  componentDidMount() {
    this.api = deniReactTreeviewApi(this);
    setTheme(this, this.props.theme || 'classic');
    loadingSetup(this);
  }

  expandAllFinished() {
    this.setState({ expandAll: false });
  }

  render() {
    const rootItem = this.api ? this.api.getRootItem() : undefined
    const domTreeviewItem = (<DeniReactTreeViewItem root={true} treeview={this} level={0} item={rootItem} />);
    let children = rootItem && rootItem.children;
    if (children && children.length === 0) {
      if (this.props.items && this.props.items.length > 0) {
        children = this.props.items;
      }
    }
    let className = 'deni-react-treeview-container unselectable ' + this.state.theme;
    if (this.props.className) {
      className += ' ' + this.props.className;
    }
    const hasItems = (children !== undefined && children.length > 0);
    if (this.state.loading && (!this.props.lazyLoad || !hasItems)) {
      className += ' loading';
    }
    const showComponent = hasItems && (!this.state.loading || this.props.lazyLoad);
    const style = this.props.style || undefined

    return (
      (showComponent) ? (
        <div ref={(elem) => this.container = elem} className={className} style={style} >
          {domTreeviewItem}
          {_createComponentsChildren(this, domTreeviewItem, 1, children, this.state.expandAll)}
        </div>
      ) : <div className={className}></div>
    )
  }

}

//DeniReactTreeView.propTypes = treeviewProps.propTypes;
//DeniReactTreeView.defaultProps = treeviewProps.defaultProps;

function _createComponentsChildren(treeview, parent, level, children, expandAll = false) {
  if (expandAll) {
    children = children.map(c => {
      c.expanded = true;
      return c;
    });
  }
  return (
    <div>
      {
        (parent.props.item && parent.props.item.expanded && children && children.length) ?
          children.map(function (child) {
            const domTreeviewItem = <DeniReactTreeViewItem 
              expandAll={expandAll} 
              treeview={treeview} 
              parent={parent} 
              level={level} 
              item={child}
            />;
            return (
              <div key={child.id}>
                {domTreeviewItem}
                {_createComponentsChildren(treeview, domTreeviewItem, level + 1, child.children)}
              </div>
            )
          })
          : undefined
      }
    </div>
  );
}

export default DeniReactTreeView;