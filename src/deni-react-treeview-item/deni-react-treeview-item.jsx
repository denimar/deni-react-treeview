import React from 'react';
import './deni-react-treeview-item.scss'
import treeviewItemHelper from './deni-react-treeview-item.helper'
//import treeviewItemProps from './deni-react-treeview-item.props'

class DeniReactTreeViewItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let self = this;
    let treeview = this.props.treeview;
    let item = this.props.item;
    let level = this.props.level;
    let selectRow = treeview.props.selectRow;

    let marginLeft = 5;
    let marginLeftItems = level === 0 ? 0 : (treeview.props.showRoot ? level * treeview.props.marginItems : (level - 1) * treeview.props.marginItems);
    let style = {
      paddingLeft: (marginLeft + marginLeftItems) + 'px',
    }
    if (!treeview.props.showRoot && this.props.root) {
      style.display = 'none';
    }

    return (
      <div style={style} className={treeviewItemHelper.getClassItem(treeview, item, level, selectRow)} onMouseDown={treeviewItemHelper.treeviewItemContainerMouseDown.bind(this, this.props.treeview, selectRow)} onDoubleClick={treeviewItemHelper.treeviewItemContainerDoubleClick.bind(this, treeviewItemHelper, this.props.treeview, selectRow)}>
        <div className={treeviewItemHelper.getClassExpandButton(treeview, this, item)} onMouseDown={treeviewItemHelper.treeviewItemExpandButtonMouseDown.bind(this, this.props.treeview, item)}></div>

        <div className={treeviewItemHelper.getClassCheckbox(treeview, item)} onMouseDown={treeviewItemHelper.treeviewItemCheckboxMouseDown.bind(this, treeviewItemHelper, this.props.treeview, item)}></div>

        <div className={treeviewItemHelper.getClassIconAndText(treeview, item, selectRow)}>
          <div className={treeviewItemHelper.getClassIcon(treeview, item)}></div>
          <div className="text">
            <span className="text-inner">{treeviewItemHelper.getInnerText(treeview, item)}</span>
          </div>
        </div>

      </div>
    )
  }

}

//DeniReactTreeViewItem.propTypes = treeviewItemProps.propTypes;
//DeniReactTreeViewItem.defaultProps = treeviewItemProps.defaultProps;

export default DeniReactTreeViewItem;
