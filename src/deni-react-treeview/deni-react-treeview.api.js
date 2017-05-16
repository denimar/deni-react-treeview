import treeviewApiImpl from './deni-react-treeview.api.impl'
import treeviewHelper from './deni-react-treeview.helper'

module.exports = (scope) => {

  return {

    //
    //
    //
    addItem: (text, isLeaf, parentNode) => {
      return treeviewApiImpl.addItem(scope, text, isLeaf, parentNode);
    },

    //
    // folderToFind can be passed as a "id" or as a "object" ex:
    //
    //  treeviewEl.api.findFolder(456) //456 is a id value or
    //  treeviewEl.api.findFolder({name: 'Brazil'}) //it will searches for the first folder that match the passed data and leaf is not true
    //
    findFolder: (folderToFind) => {
      return treeviewApiImpl.findFolder(scope, folderToFind);
    },

    //
    // folderToFind can be passed as a "id" or as a "object" ex:
    //
    //  treeviewEl.api.findFolder(456) //456 is a id value or
    //  treeviewEl.api.findFolder({name: 'Brazil'}) //it will searches for the first folder that match the passed data and leaf is not true
    //
    findNode: (nodeToFind) => {
      return treeviewApiImpl.findNode(scope, nodeToFind);
    },

    //
    // itemToFind can be passed as a "id" or as a "object" ex:
    //
    //  treeviewEl.api.findItem(357) //357 is a id value or
    //  treeviewEl.api.findItem({name: 'Dog'}) //it will searches for the first item that match the passed data and leaf is true
    //
    findItem: (itemToFind) => {
      return treeviewApiImpl.findItem(scope, itemToFind);
    },

    //
    //
    //
    getItems: () => {
      return treeviewApiImpl.getItems(scope);
    },

    //
    //
    //
    getParentNode: (item) => {
      return treeviewApiImpl.getParentNode(scope, item);
    },


    //
    //
    //
    getRootItem: () => {
      return treeviewApiImpl.getRootItem(scope);
    },

    //
    //
    //
    getSelectedItem: () => {
      return treeviewApiImpl.getSelectedItem(scope);
    },

    //
    //
    //
    load: treeviewHelper.load.bind(scope),

    //
    //
    //
    loadData: treeviewHelper.loadData.bind(scope),

    //
    //
    //
    removeItem: (id) => {
      treeviewApiImpl.removeItem(scope, id);
    },

    //
    // itemToFind can be passed as a "id" or as a "object" ex:
    //
    //  treeviewEl.api.selectItem(357) //357 is a id value or
    //  treeviewEl.api.selectItem({name: 'Dog'}) //it will searches for the first item that match the passed data and leaf is true
    //
    selectItem: (itemToFind) => {
      treeviewApiImpl.selectItem(scope, itemToFind);
    },

    //
    //
    //
    setTheme: (newTheme) => {
      treeviewHelper.setTheme(scope, newTheme);
    }

  }

}
