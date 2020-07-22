import React from 'react';
import './DeniReactTreeViewItem.scss'

import { 
  getClassItem, 
  getClassIcon, 
  getClassExpandButton, 
  getClassCheckbox, 
  getClassIconAndText,
  getInnerText,
  treeviewItemContainerDoubleClick,
  treeviewItemContainerMouseDown,
  treeviewItemExpandButtonMouseDown,
  treeviewItemCheckboxMouseDown
} from './DeniReactTreeviewItemHelper'
import { DeniReactTreeviewItemProps } from './DeniReactTreeViewItemProps';


class DeniReactTreeViewItem extends React.Component<DeniReactTreeviewItemProps> {
  constructor(props) {
    super(props);
  }

  render() {
    const { treeview, item, level, selectRow } = this.props

    const marginLeft = 5;
    const marginLeftPropValue = treeview.props['marginItems'] || 30
    const marginLeftItems: number = level === 0 ? 0 : (treeview.props['showRoot'] ? level * marginLeftPropValue : (level - 1) * marginLeftPropValue);
    const style: any = {
      paddingLeft: (marginLeft + marginLeftItems) + 'px',
    }
    if (!treeview.props['showRoot'] && this.props.root) {
      style.display = 'none';
    }

    return (
      <div 
        style={style} 
        className={getClassItem(treeview, item, level, selectRow)} 
        onMouseDown={treeviewItemContainerMouseDown.bind(this, this.props.treeview, item, selectRow)} 
        onDoubleClick={treeviewItemContainerDoubleClick.bind(this, treeviewItemExpandButtonMouseDown, this.props.treeview, selectRow)}
      >
        <div 
          className={getClassExpandButton(treeview, this, item)} 
          onMouseDown={treeviewItemExpandButtonMouseDown.bind(this, this.props.treeview, item)}
        />

        <div 
          className={getClassCheckbox(treeview, item)} 
          onMouseDown={treeviewItemCheckboxMouseDown.bind(this, this.props.treeview, item)}
        />

        <div className={getClassIconAndText(treeview, item, selectRow)}>
          <div className={getClassIcon(treeview, item)}></div>
          <div className="text">
            <span className="text-inner">{getInnerText(treeview, item)}</span>
          </div>
        </div>

      </div>
    )
  }

}

export default DeniReactTreeViewItem;
