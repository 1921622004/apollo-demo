import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { List } from "antd";
import TodoItem from "./TodoItem";

const QUERY_TODO = gql`
  {
    TodoList{
      content
      id
      checked
    }
  }
`;

const TodoList = () => (
  <Query
    query={QUERY_TODO}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>loading...</p>;
      if (error) return <p>error...</p>;
      return (
        <List
          dataSource={data.TodoList}
          itemLayout="vertical"
          renderItem={(item) => <TodoItem data={item}/>}
        />
      )
    }}
  </Query>
);

export default TodoList