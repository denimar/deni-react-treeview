var path = require('path');
var webpack = require('webpack');

var APP_DIR = path.resolve(__dirname, 'src');
var GHPAGES_DIR = path.resolve(__dirname, 'gh-pages');

var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

var plugins = [];
plugins.push(new UglifyJsPlugin({ minimize: true }));


module.exports = {
  devtool: 'source-map',
  entry: {
    index: GHPAGES_DIR + '/examples/index.js',
  },
  output: {
    path: GHPAGES_DIR + '/examples/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'env']
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
  		  	    sourceMap: false
  			    }
  		    },
  		    {
  			    loader: "sass-loader",
            options: {
  			      sourceMap: false
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
