const config = require("../config");
const Activity = require("./Activity/model");
const variables = require("./variables");

const _setVariables = async (req) => {
  const activities = await Activity.find();

  if (activities.length) {
    variables.activityId = (await Activity.find()).slice(-1)[0]._id.toString() || "";
  }

  req.body.variables = { ...variables, ...req.body.variables };
};

const context = async ({ req }) => {
  if (!config.env.startsWith("prod")) await _setVariables(req); // @dev

  return { Activity };
};

module.exports = context;
