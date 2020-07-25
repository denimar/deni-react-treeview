import DeniReactTreeviewApiImpl from './DeniReactTreeviewApiImpl'
import { load, loadData, setTheme } from './DeniReactTreeviewHelper'

const deniReactTreeviewApi = scope => {
  return {

    //
    //
    //
    addItem: (text, isLeaf, parentNode) => {
      return DeniReactTreeviewApiImpl.addItem(scope, text, isLeaf, parentNode);
    },

    //
    // folderToFind can be passed as a "id" or as a "object" ex:
    //
    //  treeviewEl.api.findFolder(456) //456 is a id value or
    //  treeviewEl.api.findFolder({name: 'Brazil'}) //it will searches for the first folder that match the passed data and leaf is not true
    //
    findFolder: (folderToFind) => {
      return DeniReactTreeviewApiImpl.findFolder(scope, folderToFind);
    },

    //
    // Expand all the children from the rootItem recursively
    expandAll: () => {
      DeniReactTreeviewApiImpl.expandAll(scope);
    },
    //
    // folderToFind can be passed as a "id" or as a "object" ex:
    //
    //  treeviewEl.api.findFolder(456) //456 is a id value or
    //  treeviewEl.api.findFolder({name: 'Brazil'}) //it will searches for the first folder that match the passed data and leaf is not true
    //
    findNode: (nodeToFind) => {
      return DeniReactTreeviewApiImpl.findNode(scope, nodeToFind);
    },

    //
    // itemToFind can be passed as a "id" or as a "object" ex:
    //
    //  treeviewEl.api.findItem(357) //357 is a id value or
    //  treeviewEl.api.findItem({name: 'Dog'}) //it will searches for the first item that match the passed data and leaf is true
    //
    findItem: (itemToFind) => {
      return DeniReactTreeviewApiImpl.findItem(scope, itemToFind);
    },

    //
    //
    //
    getItems: () => {
      return DeniReactTreeviewApiImpl.getItems(scope);
    },

    //
    //
    //
    getParentNode: (item) => {
      return DeniReactTreeviewApiImpl.getParentNode(scope, item);
    },


    //
    //
    //
    getRootItem: () => {
      return DeniReactTreeviewApiImpl.getRootItem(scope);
    },

    //
    //
    //
    getSelectedItem: () => {
      return DeniReactTreeviewApiImpl.getSelectedItem(scope);
    },

    //
    //
    //
    load: item => load(scope, item),  

    //
    //
    //
    loadData: loadData.bind(scope),

    //
    //
    //
    removeItem: (id) => {
      DeniReactTreeviewApiImpl.removeItem(scope, id);
    },

    //
    // itemToFind can be passed as a "id" or as a "object" ex:
    //
    //  treeviewEl.api.selectItem(357) //357 is a id value or
    //  treeviewEl.api.selectItem({name: 'Dog'}) //it will searches for the first item that match the passed data and leaf is true
    //
    selectItem: (itemToFind) => {
      DeniReactTreeviewApiImpl.selectItem(scope, itemToFind);
    },

    //
    //
    //
    setTheme: (newTheme) => {
      setTheme(scope, newTheme);
    },

  }

}

export {
  deniReactTreeviewApi
};