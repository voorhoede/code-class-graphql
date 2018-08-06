const dotenv = require('dotenv-webpack');

module.exports = {
  mode: 'development',
  entry: './exercise-3/apollo-exercise.js',
  plugins: [new dotenv({ safe: true })],
};
