import {ROOT_ITEM} from './DeniReactTreeviewConsts'
import axios from 'axios';

const loadingSetup = treeview => {
  //by props.url
  if (treeview.props.url || treeview.props.json || treeview.props.lazyLoad) {
    if (treeview.props.autoLoad !== false) {
      treeview.api.load();
    }
  } else {
    //by props.items
    if (treeview.props.items) {
      treeview.api.loadData(treeview, treeview.props.items);
    }
  }
}

const setTheme = (treeview, newTheme) => {
  const theme = newTheme || 'classic';
  require('../styles/themes/' + theme + '-theme.scss')
  treeview.setState({ theme });
}

const load = (treeview, item) => {
  treeview.setState({
    loading: true
  });

  return new Promise(function(success, reject) {

    if (treeview.props.url || treeview.props.json) {
      let urlToLoad = treeview.props.url || treeview.props.json;
      if (treeview.props.lazyLoad) {
        const currentItem = item || treeview.state.rootItem || ROOT_ITEM;
        delete currentItem['children'];
        urlToLoad += '?lazyLoad=true&item=' + JSON.stringify(currentItem);
      }

      axios.get(urlToLoad)
        .then(res => {
          treeview.setState({
            loading: false
          });
          treeview.api.loadData(treeview, res.data, item);
          success(res.data);
        })
        .catch(error => {
          console.error(`Error loading data: ${error.message}`)
        })
    } else if (treeview.props.lazyLoad) {
      treeview.setState({
        loading: false
      });
      reject('TODO: under construction');
    } else {
      treeview.setState({
        loading: false
      });
      const msg = 'To use load function you must define lazyLoad:true or a valid url.';
      console.error(msg);
      reject(msg);
    }
  });
}

//
// item is a optional param that when it is set data must be an array (children)
//
const loadData = (treeview, data, item) => {
  //
  const dataToLoad = data || [];

  //onBeforeLoad event
  if (treeview.props.onBeforeLoad) {
    treeview.props.onBeforeLoad(dataToLoad, item);
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
    treeview.setState({
      rootItem: _resolveRootItem(dataToLoad)
    });
  }

  //onAfterLoad event
  if (treeview.props.onAfterLoad) {
    treeview.props.onAfterLoad(dataToLoad, item);
  }

}

function _resolveRootItem(items) {
  let rootItem = Object.assign({}, ROOT_ITEM);

  if (items) {
    if (items instanceof Array) {
      rootItem['children'] = items;
    } else if (items instanceof Object) {
      rootItem = items;
    } else {
      throw new Error('Parameter "items" adjusted in a wrong way.');
    }
    return rootItem;
  }
  return null;
}

export {
  loadingSetup,
  setTheme,
  load,
  loadData
};