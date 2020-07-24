import React from 'react'
import ActionButtons from "./action-buttons";
import { CHECKBOX_STATE } from './DeniReactTreeviewItemConsts'
import DeniReactTreeView from '../deni-react-treeview/DeniReactTreeView';

const isSelected = (treeview, item) => {
  return treeview.state.selectedItem === item;
}

const  getClassItem = (treeview, item, level, selectRow) => {
    const classNames = ['deni-react-treeview-item-container'];

    classNames.push('unselectable');

    if ((item.root === true) && (treeview.props.showRoot === false)) {
        classNames.push('hidden');
    } else {
        classNames.push(treeview.state.theme);
        classNames.push('level-' + level);

        if (selectRow) {
            classNames.push('select-row');
            if (isSelected(treeview, item)) {
                classNames.push('selected');
            }
        }
    }

    return classNames.join(' ');
}

const getClassIcon = (treeview, item) => {
  const classNames = ['icon'];

  if (treeview.props.showIcon === false) {
    classNames.push('hidden');      
  } else {
    if ((item.isLeaf) && (!(item.children && item.children.length > 0))) { //when it has children, so is no longer has to be leaf
        classNames.push('isleaf');
    }

    if (item.expanded) {
        classNames.push('expanded');
    }
  }

  return classNames.join(' ');
}

const getClassExpandButton = (treeview, treeviewItem, item) => {
  const classNames = ['expand-button'];

  if (((item.children && item.children.length > 0) || (!item.isLeaf && treeview.props.lazyLoad))) {
      classNames.push('hasChild');

      if (item.expanded) {
          classNames.push('expanded');
      } else {
          classNames.push('colapsed');
      }
  }

  if (treeviewItem.state.loading) {
      classNames.push('loading');
  }

  if (isSelected(treeview, item)) {
      classNames.push('selected');
  }

  return classNames.join(' ');
}

const getClassCheckbox = (treeview, item) => {
  const classNames = ['checkbox'];

  if (treeview.props.showCheckbox) {
      if (item.state === CHECKBOX_STATE.CHECKED) {
          classNames.push('checked');
      } else if (item.state === CHECKBOX_STATE.UNDETERMINED) {
          classNames.push('undetermined');
      }

      if (isSelected(treeview, item)) {
          classNames.push('selected');
      }
  } else {
      classNames.push('hidden');
  }

  return classNames.join(' ');
}

const getClassIconAndText = (treeview, item, selectRow) => {
  const classNames = ['icon-and-text'];

  if (selectRow) {
      classNames.push('select-row');
  }

  if ((!selectRow) && (isSelected(treeview, item))) {
      classNames.push('selected');
  }

  return classNames.join(' ');
}

const getInnerText = (treeview: DeniReactTreeView, item: any): JSX.Element => {
  if (treeview.props.actionButtons) {
      return (<ActionButtons 
        onActionButtonClick={treeview.props.onActionButtonClick}
        buttons={treeview.props.actionButtons}       
        item={item}
      />)
  } else {
      if (treeview.props.onRenderItem) {
          return treeview.props.onRenderItem(item, treeview)
      } else {
          return item.text;
      }
  }
}

const treeviewItemContainerDoubleClick = (treeviewItemExpandButtonMouseDown, treeview, selectRow, event) => {
    /*
  let canContinue = selectRow;

  if (!canContinue) {
      const target = event.target;
      canContinue = ((target.classList.contains('icon-and-text')) || (target.classList.contains('icon')) || (target.classList.contains('text-inner')) || (target.classList.contains('text')));
  }

  if (canContinue) {
      const item = this.props.item;
      if (item.isLeaf) {
          //TODO: Create a event here
      } else {
          treeviewItemExpandButtonMouseDown.apply(this, [treeview, item]);
      }
  }
  */
}

const treeviewItemContainerMouseDown = (treeview, item, selectRow, event) => {
  if (treeview.state.selectedItem !== item) {
      const target = event.target;
      const finishRoutine = function () {
          treeview.setState({
              selectedItem: item,
          });
      };

      if (selectRow) {
          finishRoutine();
      } else {
          if ((target.classList.contains('icon-and-text')) || (target.classList.contains('icon')) || (target.classList.contains('text-inner')) || (target.classList.contains('text') || (target.classList.contains('action-buttons-container-text')))) {
              finishRoutine();
          }
      }

      if (treeview.props.onSelectItem) {
          const shouldFireEvent = (treeview.props.selectRow && event.target.classList.contains('deni-react-treeview-item-container')) ||
              (!treeview.props.selectRow && event.target.classList.contains('text-inner'))


          if (shouldFireEvent) {
              treeview.props.onSelectItem(item);
          }
      }
  }
}

const treeviewItemExpandButtonMouseDown = (treeview, treeviewItem, item) => {
  const conclusion = () => {
      item.expanded = !item.expanded;
      treeview.setState({ selectedItem: item });
      treeview.setState({ loading: false });
      treeviewItem.setState({ loading: false });
  };
  const resolveEventOnColapsed = () => {
      if (treeview.props.onColapsed) {
          treeview.props.onColapsed(item)
      }
  };
  const resolveEventOnExpanded = () => {
      if (treeview.props.onExpanded) {
          treeview.props.onExpanded(item)
      }
  };

  if (item.expanded) {
      conclusion();
      resolveEventOnColapsed();
  } else {
      if (treeview.props.lazyLoad) {
        treeview.setState({ loading: true });
        treeviewItem.setState({ loading: true });
        
        if (treeview.props.lazyLoad && treeview.props.onLazyLoad) {
            treeview.props.onLazyLoad(item, (children) => {
                treeview.api.loadData(treeview, children, item);
                conclusion();
            });
        } else {
            treeview.api.load(item).then(loadedData => conclusion())
        }

      } else {
          conclusion();
      }

      resolveEventOnExpanded();
  }
}

const treeviewItemCheckboxMouseDown = (treeviewItem, item) => {
  const resolveEventOnChecked = () => {
      if (treeviewItem.props.onCheckItem) {
        treeviewItem.props.onCheckItem(item)
      }
  };

  if (_isChecked(item)) {
      _uncheckNode(treeviewItem, item);
  } else {
      _checkNode(treeviewItem, item);
  }

  treeviewItem.setState({
      selectedItem: item,
  });

  resolveEventOnChecked();
}

const _checkNode = (treeviewItem, item) => {
  item.state = CHECKBOX_STATE.CHECKED;
  _refreshCheckboxStateChildren(item);
  _refreshCheckboxStateParents(treeviewItem);
}

const _uncheckNode = (treeviewItem, item) => {
  item.state = CHECKBOX_STATE.UNCHECKED;
  _refreshCheckboxStateChildren(item);
  _refreshCheckboxStateParents(treeviewItem);
}

const _refreshCheckboxStateChildren = item => {
  if (item.children) {
      item.children.forEach(function (child) {
          child.state = item.state;
          _refreshCheckboxStateChildren(child);
      });
  }
}

const _allItemsAreChecked = items => {
  for (let index = 0; index < items.length; index++) {
      const item = items[index];

      if (!_isChecked(item)) {
          return false;
      }
  }
  return true;
}

const _allItemsAreUnchecked = items => {
  for (let index = 0; index < items.length; index++) {
      const item = items[index];

      if (!_isUnchecked(item)) {
          return false;
      }
  }
  return true;
}

const _refreshCheckboxStateParents = treeviewItem => {
  const parentTreeviewItem = treeviewItem.props.parent;
  if (parentTreeviewItem) {
      const siblingItems = parentTreeviewItem.props.item.children;
      const allSiblingsAreChecked = _allItemsAreChecked(siblingItems);

      //
      if (allSiblingsAreChecked) {
          parentTreeviewItem.props.item.state = CHECKBOX_STATE.CHECKED;
      } else {
          const allSiblingsAreUnchecked = _allItemsAreUnchecked(siblingItems);
          if (allSiblingsAreUnchecked) {
              parentTreeviewItem.props.item.state = CHECKBOX_STATE.UNCHECKED;
          } else {
              parentTreeviewItem.props.item.state = CHECKBOX_STATE.UNDETERMINED;
          }
      }


      _refreshCheckboxStateParents(parentTreeviewItem);

  }
}

const _isChecked = item => {
  return item.state === CHECKBOX_STATE.CHECKED;
}

const _isUnchecked = item => {
  return item.state === CHECKBOX_STATE.UNCHECKED;
}

export {
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
}