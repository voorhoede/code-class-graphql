const dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './exercise-3/apollo-exercise.js',
  plugins: [new dotenv({ safe: true })],
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [['transform-react-jsx', { pragma: 'createElement' }]],
          },
        },
      },
    ],
  },
};
