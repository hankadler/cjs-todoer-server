const Activity = require("./Activity");

const resolvers = {
  Query: {
    ...Activity.resolvers.Query
  },

  Mutation: {
    ...Activity.resolvers.Mutation
  }
};

module.exports = resolvers;
