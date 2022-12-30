const gql = require("graphql-tag");

const typeDefs = gql`
  extend type Query {
    activities: [Activity!]!
    activity(activityId: ID!): Activity
  }

  extend type Mutation {
    createActivity(input: CreateActivityInput!): ActivityMutationOutput!
    updateActivity(activityId: ID!, input: UpdateActivityInput!): ActivityMutationOutput!
    swapActivityIndexes(indexA: Int!, indexB: Int!): ActivitiesMutationOutput!
    compressActivityIndexes: ActivitiesMutationOutput!
    deleteActivities: ActivityMutationOutput!
    deleteActivity(activityId: ID!): ActivityMutationOutput!
  }

  type Activity {
    _id: ID!
    index: Int!
    description: String!
    completed: Boolean!
  }
  
  type ActivitiesMutationOutput implements MutationOutput {
    success: Boolean!
    message: String
    activities: [Activity!]
  }


  type ActivityMutationOutput implements MutationOutput {
    success: Boolean!
    message: String
    activity: Activity
  }

  input CreateActivityInput {
    description: String!
  }

  input UpdateActivityInput {
    index: Int
    description: String
    completed: Boolean
  }
`;

module.exports = typeDefs;
