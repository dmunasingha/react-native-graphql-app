require('dotenv').config();
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');

const typeDefs = require('./src/schema/typeDefs');
const resolvers = require('./src/resolvers/todoResolver');

async function startServer() {
    const app = express();
    app.use(cors());

    const server = new ApolloServer({ typeDefs, resolvers });

    await server.start();
    server.applyMiddleware({ app });

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () =>
        console.log(`🚀 Server running at http://localhost:${PORT}${server.graphqlPath}`)
    );
}

startServer();
