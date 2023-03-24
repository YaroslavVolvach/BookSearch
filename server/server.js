const express = require('express');
const path = require('path');
const db = require('./config/connection');
const { authMiddleware } = require("./utils/auth");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { typeDefs, resolvers } = require("./schemas");
const cors = require('cors')


const {
  ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer");

const http = require("http");

const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 3001;
app.use(cors())

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: true }));

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

//app.use(routes);

async function startApolloServer(typeDefs, resolvers) {
  await server.start();
  app.use(cors(), express.json(), expressMiddleware(server));
  db.once("open", () => {
    httpServer.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer(typeDefs, resolvers);