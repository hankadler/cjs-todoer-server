const mongoose = require("mongoose");

/**
 * Connects to mongoDB.
 *
 * @param {string} uri - A mongoDB connection string.
 * @returns {Promise} - A connection object.
 */
const connect = async (uri) => {
  const conn = await mongoose.connect(uri);
  const { host, port, name } = conn.connections[0];
  console.log(`mongodb://${host}:${port}/${name}`);
  return conn;
};

/**
 * Disconnects from mongoDB.
 *
 * @param {Function} callback - Callback to execute on disconnect.
 * @returns {void}
 */
const disconnect = (callback = undefined) => mongoose.disconnect(callback);

/**
 * Drops active mongoDB.
 *
 * @param {Function} callback - Callback to execute on drop.
 * @returns {void}
 */
const drop = (callback = undefined) => mongoose.connection.db.dropDatabase(callback);

mongoose.set("strictQuery", false);
mongoose.set("runValidators", true);
mongoose.set("returnOriginal", false);

module.exports = { connect, disconnect, drop };
