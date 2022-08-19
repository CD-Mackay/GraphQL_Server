const { ApolloServer, gql } = require("apollo-server");
const fs = require("fs");
const path = require("path");

// Hardcoded Sample data
let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
];

const resolvers = {
  Query: {
    info: () => "world",
    feed: () => links,
  },
  Mutation: {
    post: (parent, args) => {
      let idCount = links.length;

      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      };
      links.push(link);
      return link;
    },
    updateLink: (parent, args) => {
      let id = args.id;
      for (let element in links) {
        if (element.id === id) {
          element.description = args.description,
          element.url = args.url
          return element;
        }
      }
    }
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`server ready at ${url}`);
});
