require("dotenv").config();
const path = require("path");

const env = process.env.NODE_ENV || "production";
const app = "todoer";
const port = 4000; // server
const db = {
  name: env.startsWith("prod")
    ? app
    : env.startsWith("dev")
      ? `${app}-dev`
      : `${app}-test`
};
db.uri = `mongodb://127.0.0.1:27017/${db.name}?retryWrites=true&w=majority`;
const rootDir = path.resolve(__dirname, "../");
const staticDir = path.resolve(
  rootDir,
  env.startsWith("prod") ? "../dist" : `../${app}-client/dist`
);

module.exports = {
  env,
  app,
  port,
  db,
  rootDir,
  staticDir
};
