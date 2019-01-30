import React from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
})

const App = () => (
  <ApolloProvider client={client}>
    <div className="todo-box">
      <h1>Todo</h1>
      <AddTodo />
      <TodoList />
    </div>
  </ApolloProvider>
);

export default App