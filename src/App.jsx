import React from "react";
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";
import { Card } from "antd"

import TodoList from "./components/TodoList";
import AddTodo from "./components/AddTodo";

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
})

const tabList = [
  {
    key: "checked",
    tab: "已完成"
  },
  {
    key: "unchecked",
    tab: "未完成"
  },
  {
    key: "all",
    tab: "全部"
  },
]

const App = () => (
  <ApolloProvider client={client}>
    <Card
      bordered
      style={{ width: "80%" }}
      title="TODO Demo"
      tabList={tabList}
    >
      <h1>Todo</h1>
      <AddTodo />
      <TodoList />
    </Card>
  </ApolloProvider>
);

export default App