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
  organization.membersWithRole.nodes.map(member => (
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
        organization(login: "voorhoede") {
          membersWithRole(first: 100) {
            nodes {
              id
              name
              login
              avatarUrl(size: 200)
            }
          }
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <marquee>Loading...</marquee>;
      if (error) return <p>Error {error.message}</p>;

      return voorhoedeMembers({ organization: data.organization });
    }}
  </Query>
);

render(
  createElement(ApolloProvider, { client }, fetchVoorhoedeMembers()),
  document.querySelector('[data-react-container]')
);
