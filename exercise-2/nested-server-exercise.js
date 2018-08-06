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
    `),
    rootValue: {
      codeClass: () => 'WTF is GraphQL?',
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
