const express = require('express');
const path = require('path');
const db = require('./config/connection');
const { authMiddleware } = require("./utils/auth");
const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");
const { InMemoryLRUCache } = require ('@apollo/utils.keyvaluecache');
const http = require("http");

const app = express();
const httpServer = http.createServer(app);
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({typeDefs, resolvers, cache: new InMemoryLRUCache(), context: authMiddleware});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

async function startApolloServer(){
  await server.start();
  server.applyMiddleware({ app });

  db.once("open", () => httpServer.listen(PORT));
  }


startApolloServer(typeDefs, resolvers);