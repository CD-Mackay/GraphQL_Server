const { ApolloServer, gql } = require("apollo-server");

// Hardcoded Sample data
let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
];

const typeDefs = gql`
  type Query {
    info: String!
    feed: [Link!]!
  }

  type Link {
    type: ID!
    description: String!
    url: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => "world",
    feed: () => links,
  },

  Link: {
    id: (parent) => parent.id,
    description: (parent) => parent.description,
    url: (parent) => parent.url,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`server ready at ${url}`);
});
