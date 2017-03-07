var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var entry = ['./examples/index.js'];

if (process.env.NODE_ENV === 'development') {
  entry = entry.concat([
    'webpack-dev-server/client?http://localhost:3005/examples',
    'webpack/hot/only-dev-server',
  ]);
}

module.exports = {
  devtool: 'eval',
  entry: entry,
  output: {
    path: path.join(__dirname, 'examples'),
    filename: 'bundle.js',
    publicPath: '/examples/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // new CopyWebpackPlugin([
    //   {
    //     from: './src/index.html',
    //     to: '../index.html'
    //   }
    // ])
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        exclude: /build|lib|node_modules/,
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
        exclude: /build|lib|node_modules/,
      },
      {
        test: /\.json$/,
        loaders: ['json-loader']
      },
      // {
      //   test: /\.(jpe?g|png|gif|svg)$/,
      //   loader: ['file']
      // },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      }
    ],
  }
};
