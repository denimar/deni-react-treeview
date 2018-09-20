
module.exports = {

  addItem: (scope, text, isLeaf, parentNode) => {
    const parent = parentNode || scope.state.selectedItem || scope.state.rootItem;
    if (!parent) {
      throw new Error('You must specify a parent node!');
    }
    const newItem = {
      text: text,
      children: [],
      isLeaf: isLeaf
    }
    parent.children = parent.children || [];
    parent.children.push(newItem);
    parent.expanded = true;
    _selectNode(scope, newItem);

    return newItem;
  },

  findFolder: (scope, folderToFind) => {
    let dataToFind = _normalizeDataToFind(folderToFind);
    let node = _findNode(scope.state.rootItem.children, dataToFind);
    if (!node || dataToFind.isLeaf === true) {
      throw new Error('Folder not found!');
    } else {
      return node;
    }
  },

  findItem: (scope, itemToFind) => {
    let dataToFind = _normalizeDataToFind(itemToFind);
      dataToFind['isLeaf'] = true;
      let node = _findNode(scope.state.rootItem.children, dataToFind);
      if (!node) {
        throw new Error('Item not found!');
      } else {
        return node;
      }
  },

  findNode: (scope, nodeToFind) => {
    let dataToFind = _normalizeDataToFind(nodeToFind);
    let node = _findNode(scope.state.rootItem.children, dataToFind);
    if (!node) {
      throw new Error('Node not found!');
    } else {
      return node;
    }
  },

  getItems: (scope) => {
    return scope.state.rootItem.children || [];
  },

  getParentNode: (scope, item) => {
    let currentItem = item || scope.state.selectedItem;
    return _getParentItem(scope, currentItem);
  },

  getRootItem: (scope) => {
    return scope.state.rootItem;
  },

  getSelectedItem: (scope) => {
    return scope.state.selectedItem;
  },

  removeItem: (scope, id) => {
    let node = scope.api.findNode(id);
    let parentNode = _getParentItem(scope, node);
    let childIndex = parentNode.children.findIndex((child) => {
      return child.id === node.id;
    });

    parentNode.children.splice(childIndex, 1);

    if (scope.state.selectedItem && scope.state.selectedItem.id === id)  {
      scope.setState({
        selectedItem: undefined
      });
    }

    scope.forceUpdate();

    // if (parentNode.children.length === 0) {
    //   scope.api.selectItem(parentNode)
    // } else {
    //   let newIndex = childIndex - 1;
    //   if (newIndex < 0) {
    //     newIndex = 0;
    //   }
    //   scope.api.selectItem(parentNode.children[newIndex]);
    // }
  },

  selectItem: (scope, itemToFind) => {
    let item = scope.api.findNode(itemToFind);
    if (item) {
      _selectNode(scope, item);
    } else {
      throw new Error('Item not found.');
    }
  },

}

//
function _findNode(children, dataToFind) {
  const keys = dataToFind ? Object.keys(dataToFind) : []
  for (let index = 0 ; index < children.length ; index++) {
    let child = children[index];
    let allFieldsAreEqual = true;

    for (let index2 = 0 ; index2 < keys.length ; index2++) {
      let key = keys[index2];

      if (child[key] !== dataToFind[key]) {
        allFieldsAreEqual = false;
      }
    }

    if (allFieldsAreEqual) {
      return child;
    }

    if (child.children) {
      let searchInChildren = _findNode(child.children, dataToFind);
      if (searchInChildren) {
        return searchInChildren;
      }
    }
  }
  return null;
}

//
function _getParentItems(scope, item) {
  let parents = [];
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
function _getParentItem(scope, item, parentItem) {
  let parent = parentItem  || scope.state.rootItem;
  let itemsToFind = parent.children;
  for (let index = 0 ; index < itemsToFind.length ; index++) {
    let itemToFind = itemsToFind[index];
    if (itemToFind.id === item.id) {
      return parent;
    }
    if (itemToFind.children) {
      let parent2 = _getParentItem(scope, item, itemToFind);
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
  if ((typeof  dataToFind === 'number') || (typeof  dataToFind === 'string')) {
    normalizedData['id'] = dataToFind;
  } else if (typeof  dataToFind === 'object') {
    normalizedData = dataToFind;
  } else {
    throw new Error('Parameter set in a wrong way.');
  }
  return normalizedData;
}

//
function _selectNode(scope, item) {
  let parentItems = _getParentItems(scope, item);
  parentItems.forEach(function(parent) {
    if (!parent.expanded) {
      parent.expanded = true;
    }
  });
  scope.setState({
    selectedItem: item
  });
  if (scope.props.onSelectItem) {
    scope.props.onSelectItem(item);
  }  
}
