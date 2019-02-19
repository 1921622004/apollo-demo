import React from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { Card } from "antd"

import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
})

const App = () => (
  <ApolloProvider client={client}>
    <Card
      style={{ width: "80%", margin: "100px auto",  }}
    >
      <h1>todo-demo</h1>
      <AddTodo />
      <TodoList />
    </Card>
  </ApolloProvider>
);

export default App