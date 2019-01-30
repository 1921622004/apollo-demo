import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

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
      if (loading) return <p>loading...</p>
      if (error) return <p>error...</p>
      return data.TodoList.map(({ content, id, checked }) => {
        console.log(content, checked);
        return (
          <div>
            <p>{content}</p>
            <input type="radio" checked={checked} />
          </div>
        )
      })
    }}
  </Query>
);

export default TodoList