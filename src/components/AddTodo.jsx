import React, { useState, useMemo } from "react";
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

const AddTodo = ({ addTodo }) => {
  const [newTodo, setNewTodo] = useState('');
  const submitHandler = () => {
    addTodo({ variables: { content: newTodo, checked: false } });
    setNewTodo('');
  };
  return useMemo(() => (
    <Input
      value={newTodo}
      onChange={ev => {
        const val = ev.target.value;
        setNewTodo(val);
      }}
      placeholder="按回车添加待办"
      onPressEnter={submitHandler}
    />
  ), [newTodo]);
};

export default () => {
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
    {(addTodo) => {
      return <AddTodo addTodo={addTodo} />
    }}
    </Mutation>
  )
};