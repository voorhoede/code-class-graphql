'use strict';

const ApolloClient = require('apollo-boost').default;
const gql = require('graphql-tag');
const { createElement: element } = require('react');
const { ApolloProvider, Query } = require('react-apollo');
const { render } = require('react-dom');

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
  },
});

const voorhoedeMembers = ({ organization }) =>
  organization.members.nodes.map(member =>
    element('figure', { key: member.id }, [
      element('img', { src: member.avatarUrl, key: 'image' }),
      element('figcaption', { key: 'caption' }, member.name || member.login),
    ])
  );

const fetchVoorhoedeMembers = () =>
  element(
    Query,
    {
      query: gql`
        {
        }
      `,
    },
    ({ loading, error, data }) => {
      if (loading) return element('marquee', null, 'Loading...');
      if (error) return element('p', null, `Error ${error}`);

      return voorhoedeMembers();
    }
  );

render(
  element(ApolloProvider, { client }, fetchVoorhoedeMembers()),
  document.querySelector('[data-react-container]')
);
