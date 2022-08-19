const { ApolloServer, gql } = require("apollo-server");
const { PrismaClient } = require('@prisma/client');
const fs = require("fs");
const path = require("path");

// Hardcoded Sample data

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    info: () => "world",
    feed: () => async (parent, args, context) => {
      return await context.prisma.link.findMany()
    }
  },
  Mutation: {
    post: (parent, args, context, info) => {
      const newLink = context.prisma.link.create({
        data: {
          url: args.url,
          description: args.description
        }
      })
      return newLink
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
  context: {
    prisma,
  }
});

server.listen().then(({ url }) => {
  console.log(`server ready at ${url}`);
});
