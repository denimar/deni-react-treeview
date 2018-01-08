var path = require('path');
var webpack = require('webpack');

var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var env = process.env.WEBPACK_ENV || 'dev';
var APP_DIR = path.resolve(__dirname, 'src');
var GHPAGES_DIR = path.resolve(__dirname, 'gh-pages');

var YOUR_APPLICATIONS_NAME = 'deni-react-treeview';

var APPLICATION_BASEPATH = GHPAGES_DIR + '/examples';

// Modify this to change the dev server port.
var DEV_SERVER_PORT = '3005';

var devtools = '';
var plugins = [];
var outputFile;
var outputCssFile;

devtools += 'source-map';
outputFile = YOUR_APPLICATIONS_NAME + '.js';
outputCssFile = YOUR_APPLICATIONS_NAME + '.css';

plugins.push(new ExtractTextPlugin({
  filename: './css/' + outputCssFile,
  allChunks: true
}));

var config = {
  entry: [
    GHPAGES_DIR + '/examples/index.js'
  ],
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
  	  },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devtool: devtools,
  plugins: plugins,
  devServer: {
    contentBase: APPLICATION_BASEPATH,
    compress: true,
    port: DEV_SERVER_PORT,
    open: true
  }
};

module.exports = config;
