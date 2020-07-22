
class DeniReactTreeviewApiImpl {

  static addItem = (scope, text, isLeaf, parentNode) => {
    const parent = parentNode || scope.state.selectedItem || scope.state.rootItem;
    if (!parent) {
      throw new Error('You must specify a parent node!');
    }
    const newItem = {
      text: text,
      children: [],
      isLeaf: isLeaf,
    }
    parent.children = parent.children || [];
    parent.children.push(newItem);
    parent.expanded = true;
    _selectNode(scope, newItem);

    return newItem;
  }

  static findFolder = (scope, folderToFind) => {
    const dataToFind = _normalizeDataToFind(folderToFind);
    const node = _findNode(scope.state.rootItem.children, dataToFind);
    if (!node || dataToFind['isLeaf'] === true) {
      throw new Error('Folder not found!');
    } else {
      return node;
    }
  }

  static findItem = (scope, itemToFind) => {
    const dataToFind = _normalizeDataToFind(itemToFind);
    dataToFind['isLeaf'] = true;
    const node = _findNode(scope.state.rootItem.children, dataToFind);
    if (!node) {
      throw new Error('Item not found!');
    } else {
      return node;
    }
  }

  static findNode = (scope, nodeToFind) => {
    const dataToFind = _normalizeDataToFind(nodeToFind);
    const node = _findNode(scope.state.rootItem.children, dataToFind);
    if (!node) {
      throw new Error('Node not found!');
    } else {
      return node;
    }
  }

  static expandAll = (scope) => {
    _expand(scope.state.rootItem);
  }

  static getItems = (scope) => {
    return scope.state.rootItem.children || [];
  }
  
  static getParentNode = (scope, item) => {
    const currentItem = item || scope.state.selectedItem;
    return _getParentItem(scope, currentItem);
  }

  static getRootItem = (scope) => {
    return scope.state.rootItem;
  }

  static getSelectedItem = (scope) => {
    return scope.state.selectedItem;
  }

  static removeItem = (scope, id) => {
    const node = scope.api.findNode(id);
    const parentNode = _getParentItem(scope, node);
    const childIndex = parentNode.children.findIndex((child) => {
      return child.id === node.id;
    });

    parentNode.children.splice(childIndex, 1);

    if (scope.state.selectedItem && scope.state.selectedItem.id === id) {
      scope.setState({
        selectedItem: undefined,
      });
    }

    scope.forceUpdate();
  }

  static selectItem = (scope, itemToFind) => {
    const item = scope.api.findNode(itemToFind);
    if (item) {
      _selectNode(scope, item);
    } else {
      throw new Error('Item not found.');
    }
  }

}

function _findNode(children, dataToFind) {
  const keys = dataToFind ? Object.keys(dataToFind) : []
  for (let index = 0; index < children.length; index++) {
    const child = children[index];
    let allFieldsAreEqual = true;

    for (let index2 = 0; index2 < keys.length; index2++) {
      const key = keys[index2];

      if (child[key] !== dataToFind[key]) {
        allFieldsAreEqual = false;
      }
    }

    if (allFieldsAreEqual) {
      return child;
    }

    if (child.children) {
      const searchInChildren = _findNode(child.children, dataToFind);
      if (searchInChildren) {
        return searchInChildren;
      }
    }
  }
  return null;
}

//
function _getParentItems(scope, item) {
  const parents: any[] = [];
  let currentItem = item;
  while (true) {
    currentItem = _getParentItem(scope, currentItem);
    if (currentItem) {
      if ((currentItem.root) && (!scope.props.showRoot)) {
        break;
      } else {
        parents.push(currentItem);
      }
    } else {
      break;
    }
  }
  return parents;
}

//
function _getParentItem(scope, item, parentItem?) {
  const parent = parentItem || scope.state.rootItem;
  const itemsToFind = parent.children;
  for (let index = 0; index < itemsToFind.length; index++) {
    const itemToFind = itemsToFind[index];
    if (itemToFind.id === item.id) {
      return parent;
    }
    if (itemToFind.children) {
      const parent2 = _getParentItem(scope, item, itemToFind);
      if (parent2) {
        return parent2;
      }
    }
  }
  // if (item.parent === scope.state.rootItem.id) {
  //   if (scope.props.showRoot) {
  //     return scope.state.rootItem;
  //   } else {
  //     return undefined;
  //   }
  // } else {
  //   let parentItem = vm.findFolder(scope, item.parent);
  //   return parentItem;
  // }
}

//
function _normalizeDataToFind(dataToFind) {
  let normalizedData = {};
  if ((typeof dataToFind === 'number') || (typeof dataToFind === 'string')) {
    normalizedData['id'] = dataToFind;
  } else if (typeof dataToFind === 'object') {
    normalizedData = dataToFind;
  } else {
    throw new Error('Parameter set in a wrong way.');
  }
  return normalizedData;
}

//
function _selectNode(scope, item) {
  const parentItems = _getParentItems(scope, item);
  parentItems.forEach(function (parent) {
    if (!parent.expanded) {
      parent.expanded = true;
    }
  });
  scope.setState({
    selectedItem: item,
  });
  setTimeout(() => {
    if (scope.container) {
      let selectedRowElem
      if (scope.props.selectRow) {
        selectedRowElem = scope.container.querySelector('.deni-react-treeview-item-container.selected')
      } else {
        const selectedElem = scope.container.querySelector('.icon-and-text.selected')
        if (selectedElem) {
          selectedRowElem = selectedElem.closest('.deni-react-treeview-item-container')
        }
      }
      if (selectedRowElem) {
        selectedRowElem.scrollIntoViewIfNeeded()
      }
    }
  })
  if (scope.props.onSelectItem) {
    scope.props.onSelectItem(item);
  }
}

function _expand(item) {
  if (item.children) {
    item.children.forEach((i) => {
      if (i.children) {
        i.expanded = true;
        _expand(i);
      }
    });
  }
}


export default DeniReactTreeviewApiImpl