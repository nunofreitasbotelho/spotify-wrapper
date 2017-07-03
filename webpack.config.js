const webpack = require('webpack');

const inProduction = process.env.NODE_ENV === 'production';

module.exports = {
  devtool: 'source-map',
  entry: {
    filename: './src/main.js',
  },
  output: {
    filename: './dist/bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [],
};

if (inProduction) {
  module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
  }));
}
