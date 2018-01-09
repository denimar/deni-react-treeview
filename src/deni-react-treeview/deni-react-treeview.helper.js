import {ROOT_ITEM} from './deni-react-treeview.constant'
import axios from 'axios';

module.exports = {

  loadingSetup(treeview) {
    //by props.url
    if (treeview.props.url || treeview.props.json || treeview.props.lazyLoad) {
      if (treeview.props.autoLoad) {
        treeview.api.load();
      }
    } else {
      //by props.items
      if (treeview.props.items) {
        treeview.api.loadData(treeview.props.items);
      }
    }
  },

  setTheme(treeview, newTheme) {
    //theme
    let theme = newTheme || 'classic';
    require('../themes/' + newTheme + '-theme.scss')

    treeview.setState({
      theme: newTheme
    });
  },

  load(item) {
    let self = this;

    self.setState({
      loading: true
    });

    return new Promise(function(success, reject) {

      if (self.props.url || self.props.json) {
        let urlToLoad = self.props.url || self.props.json;
        if (self.props.lazyLoad) {
          let currentItem = item || self.state.rootItem || ROOT_ITEM;
          delete currentItem['children'];
          urlToLoad += '?lazyLoad=true&item=' + JSON.stringify(currentItem);
        }

        axios.get(urlToLoad)
          .then(res => {
            self.setState({
              loading: false
            });
            self.api.loadData(res.data, item);
            success(res.data);
          });
      } else if (self.props.lazyLoad) {
        self.setState({
          loading: false
        });
        reject('TODO: under construction');
      } else {
        self.setState({
          loading: false
        });
        let msg = 'To use load function you must define lazyLoad:true or a valid url.';
        console.error(msg);
        reject(msg);
      }
    });
  },

  //
  // item is a optional param that when it is set data must be an array (children)
  //
  loadData(data, item) {
    //
    let dataToLoad = data || [];

    //onBeforeLoad event
    if (this.props.onBeforeLoad) {
      this.props.onBeforeLoad(dataToLoad, item);
    }

    //
    if (item) {
      //
      if (dataToLoad instanceof Array) {
        item.children = dataToLoad;
      } else {
        throw new Error('When item param is set the data must be an array.');
      }
    } else {
      this.setState({
        rootItem: _resolveRootItem(dataToLoad)
      });
    }

    //onAfterLoad event
    if (this.props.onAfterLoad) {
      this.props.onAfterLoad(dataToLoad, item);
    }

  }

}

function _resolveRootItem(items) {
  let rootItem = ROOT_ITEM;

  if (items) {
    if (items instanceof Array) {
      rootItem.children = items;
    } else if (items instanceof Object) {
      rootItem = items;
    } else {
      throw new Error('Parameter "items" adjusted in a wrong way.');
    }
    return rootItem;
  }
  return null;
}
