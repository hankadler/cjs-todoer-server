const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const model = require("./model");
const variables = require("./variables");

const Activity = { typeDefs, resolvers, model, variables };

module.exports = Activity;
