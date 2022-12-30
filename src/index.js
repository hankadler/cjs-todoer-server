const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { ApolloServerPluginDrainHttpServer } = require("@apollo/server/plugin/drainHttpServer");
const express = require("express");
const http = require("http");
const cors = require("cors");
const config = require("./config");
const db = require("./db");
const { typeDefs, resolvers, context } = require("./schema");

const start = async () => {
  await db.connect(config.db.uri);

  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    cors: true,
    typeDefs,
    resolvers,
    formatError: ({ message, extensions: { code, stacktrace } }) => ({ code, message, stacktrace }),
    csrfPrevention: true,
    introspection: !config.env.startsWith("prod"),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
  });

  await server.start();

  // app.get("/", async (req, res) => res.status(200).json({ message: "success" }));

  app.use("/", express.static(config.staticDir));

  app.use(
    "/graphql",
    cors(),
    express.json(),
    expressMiddleware(server, { context })
  );

  httpServer.listen({ port: config.port });
  console.log(`app @ http://127.0.0.1:${config.port}`);
  console.log(`gql @ http://127.0.0.1:${config.port}/graphql`);

  process.on("SIGTERM", () => {
    db.disconnect(() => console.log("Disconnected from db"));
    server.stop().then(() => console.log("Server closed"));
  });
};

const stop = async () => process.emit("SIGTERM");

module.exports = { start, stop };

if (require.main === module) start().catch((error) => console.log(error.message));
