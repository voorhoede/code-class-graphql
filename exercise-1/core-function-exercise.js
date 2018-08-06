'use strict';

const { graphql, buildSchema } = require('graphql');

graphql(
  buildSchema(`
    type Query {
      codeClass: String
    }
  `),
  '{ codeClass }',
  {
    codeClass: () => 'WTF is GraphQL?',
  }
)
  .then(console.info);
