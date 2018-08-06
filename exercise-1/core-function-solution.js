'use strict';

const { graphql, buildSchema } = require('graphql');

graphql(
  buildSchema(`
    type Query {
      codeClass: [String]
    }
  `),
  '{ codeClass }',
  {
    codeClass: () => ['WTF is GraphQL?', 'Queries all the way'],
  }
)
  .then(console.info);
