module.exports = {
  entry: './front/src/app.js',

  output: {
    filename: 'dist/bundle.js'
  },

  devtool: 'eval',

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },

  resolve: {
    alias: {
      'react': 'preact-compat',
      'react-dom': 'preact-compat',
    }
  }
}
