const { gql } = require('apollo-server-express');

module.exports = gql`
  type Todo {
    id: Int!
    title: String!
    completed: Boolean!
    createdAt: String
    updatedAt: String
  }

  type Query {
    getTodos: [Todo]
  }

  type Mutation {
    addTodo(title: String!): Todo
    toggleTodo(id: Int!): Todo
    deleteTodo(id: Int!): String
  }
`;
