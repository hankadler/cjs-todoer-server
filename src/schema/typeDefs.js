const gql = require("graphql-tag");
const Activity = require("./Activity");

module.exports = gql`
  type Query {
    _: String
  }

  type Mutation {
    _: String
  }
 
  interface MutationOutput {
    success: Boolean!
    message: String
  }

  ${Activity.typeDefs}
`;
