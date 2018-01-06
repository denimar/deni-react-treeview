var path = require('path');
var webpack = require('webpack');

var APP_DIR = path.resolve(__dirname, 'src');
var BUILD_DIR = path.resolve(__dirname, 'build');

var CleanWebpackPlugin = require('clean-webpack-plugin');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var plugins = [];
plugins.push(new CleanWebpackPlugin(['build']));
plugins.push(new UglifyJsPlugin({ minimize: false }));


module.exports = {
  entry: {
    index: APP_DIR + '/deni-react-treeview/deni-react-treeview.jsx',
  },
  output: {
    path: BUILD_DIR,
    publicPath: 'build/',
    filename: 'deni-react-treeview.js',
    library: 'TreeView',
    libraryTarget: 'umd'
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        exclude: [/(node_modules|bower_components)/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'es2015']
          }
        }
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
  	  {
  		  test: /\.scss$/,
  		  use: [
  		    {
  		  	  loader: "style-loader"
  		    },
  		    {
    			  loader: "css-loader",
  	  		  options: {
  		  	    sourceMap: true
  			    }
  		    },
  		    {
  			    loader: "sass-loader",
            options: {
  			      sourceMap: true
  			    }
  		    }
  	   	]
  	  }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: plugins
}
