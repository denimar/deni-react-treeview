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
    this.state = { loading: false }
  }

  render() {
    const { treeview, item, level } = this.props
    const { selectRow, marginItems } = treeview.props
    const marginItem = marginItems ? parseInt(marginItems.toString()) : 30

    const marginLeft = 5;
    const marginLeftItems: number = level === 0 ? 0 : (treeview.props['showRoot'] ? level * marginItem : (level - 1) * marginItem);
    const cssStyle: any = {
      paddingLeft: (marginLeft + marginLeftItems) + 'px',
    }
    if (!treeview.props['showRoot'] && this.props.root) {
      cssStyle.display = 'none';
    }

    return (
      <div 
        style={cssStyle} 
        className={getClassItem(treeview, item, level, selectRow)} 
        onMouseDown={treeviewItemContainerMouseDown.bind(this, this.props.treeview, item, selectRow)} 
        onDoubleClick={treeviewItemContainerDoubleClick.bind(this, treeviewItemExpandButtonMouseDown, this.props.treeview, this, selectRow)}
      >
        <div 
          className={getClassExpandButton(treeview, this, item)} 
          onMouseDown={treeviewItemExpandButtonMouseDown.bind(this, this.props.treeview, this, item)}
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