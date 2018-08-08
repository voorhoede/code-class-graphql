'use strict';

const ApolloClient = require('apollo-boost').default;
const gql = require('graphql-tag');
const { createElement } = require('react');
const { ApolloProvider, Query } = require('react-apollo');
const { render } = require('react-dom');

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `Bearer ${process.env.GITHUB_API_TOKEN}`,
  },
});

const voorhoedeMembers = ({ organization }) => (
  organization.members.nodes.map(member => (
    <figure key={member.id}>
      <img src={member.avatarUrl} />
      <figcaption>{member.name || member.login}</figcaption>
    </figure>
  ))
);

const fetchVoorhoedeMembers = () => (
  <Query
    query={gql`
      {
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <marquee>Loading...</marquee>;
      if (error) return <p>Error {error}</p>;

      return voorhoedeMembers();
    }}
  </Query>
);

render(
  createElement(ApolloProvider, { client }, fetchVoorhoedeMembers()),
  document.querySelector('[data-react-container]')
);
