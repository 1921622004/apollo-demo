import React, { useState } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Input } from "antd";

const ADD_TODO = gql`
  mutation createTodo($content:String!, $checked:Boolean){
    createTodo(content: $content, checked: $checked){
      content
      id
      checked
    }
  }
`;
const QUERY_TODO = gql`
  {
    TodoList{
      content
      id
      checked
    }
  }
`;

const AddTodo = () => {
  const [newTodo, setNewTodo] = useState('');
  return (
    <Mutation
      mutation={ADD_TODO}
      update={(cache, { data }) => {
        cache.writeQuery({
          query: QUERY_TODO,
          data: {
            TodoList: data.createTodo
          }
        })
      }}
    >
      {(addTodo) => (
        <div>
          <Input
            value={newTodo}
            onChange={ev => {
              const val = ev.target.value;
              setNewTodo(val);
            }}
          />
          <button onClick={() => {
            addTodo({ variables: { content: newTodo, checked: false } });
            setNewTodo('');
          }}>submit</button>
        </div>
      )}
    </Mutation>
  )
};

export default AddTodo