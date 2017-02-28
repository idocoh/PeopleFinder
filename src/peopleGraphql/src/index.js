const graphManager = require('./GraphQL/GraphManager.js');

//require('typescript-require');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const mongoUtils = require('./DB/MongoClientUtils.js');

const app = express();
const port = 5000;

app.use('/graphql', graphqlHTTP({
    schema: graphManager.schema,
    rootValue: graphManager.resolvers,
    graphiql: true
}));

app.listen(port);
console.log('Running a GraphQL API server at localhost: ' + port + '/graphql');

mongoUtils.connect();
console.log('Connecting to MongoDb');
