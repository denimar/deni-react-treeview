
module.exports = {

  addItem: (scope, text, isLeaf) => {
    const parentNode = scope.state.selectedItem;
    if (!parentNode) {
      throw new Error('You must select a item!');
    }
    const newItem = {
      text: text,
      children: [],
      isLeaf: false
    }
    parentNode.children = parentNode.children || [];
    parentNode.children.push(newItem);
    parentNode.expanded = true;
    _selectNode(scope, newItem);
  },

  findFolder: (scope, itemToFind) => {
    let dataToFind = _normalizeDataToFind(folderToFind);
    let keys = Object.keys(dataToFind);
    let node = _findNode(scope.ctrl.rootItem.children, dataToFind, keys);
    if (!node) {
      throw new Error('Folder not found!');
    } else {
      return node;
    }
  },

  findItem: (scope, itemToFind) => {
    let dataToFind = _normalizeDataToFind(itemToFind);
      dataToFind['isLeaf'] = true;
      let keys = Object.keys(dataToFind);
      let node = _findNode(scope.state.rootItem.children, dataToFind, keys);
      if (!node) {
        throw new Error('Item not found!');
      } else {
        return node;
      }
  },

  getSelectedItem: (scope) => {
    return scope.state.selectedItem;
  },

  selectItem: (scope, itemToFind) => {
    let item = scope.api.findItem(itemToFind);
    _selectNode(scope, item);
  }

}

//
function _findNode(children, dataToFind, keys) {
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
      if (child.isLeaf === dataToFind.isLeaf) {
        return child;
      }
    }

    if (child.children) {
      let searchInChildren = _findNode(child.children, dataToFind, keys);
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
  if (typeof  dataToFind === 'number') {
    normalizedData['id'] = dataToFind;
  } else if (typeof  dataToFind === 'string') {
    normalizedData['id'] = parseInt(dataToFind);
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
}
