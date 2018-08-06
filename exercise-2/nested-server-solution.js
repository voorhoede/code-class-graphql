'use strict';

const express = require('express');
const expressGraphql = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();

app.use(
  '/graphql',
  expressGraphql({
    schema: buildSchema(`
      type Query {
        codeClass: CodeClass
      }

      type CodeClass {
        name: String!
        date: String
      }
    `),
    rootValue: {
      codeClass: () => ({
        name: () => Promise.resolve('WTF is GraphQL?'),
        date: () => new Date().toLocaleDateString('nl', { weekday: 'long' }),
      }),
    },
    graphiql: true,
  })
);

const listener = app.listen(3333, () => {
  console.info(
    `🚀 GraphiQL launched on http://localhost:${
      listener.address().port
    }/graphql`
  );
});
