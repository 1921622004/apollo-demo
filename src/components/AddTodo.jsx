import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const ADD_TODO = gql`
  mutation createTodo($content:String!, $checked:Boolean){
    createTodo(content: $content, checked: $checked){
      content
      id
      checked
    }
  }
`;

const AddTodo = () => {
  let input;
  return (
    <Mutation mutation={ADD_TODO}>
      {(addTodo, { data }) => (
        <div>
          <input type="text" ref={ele => input = ele} />
          <button onClick={() => {
            const value = input.value;
            if (!value) return;
            addTodo({ variables: { content: input.value, checked: false } });
            input.value = '';
          }}>submit</button>
        </div>
      )}
    </Mutation>
  )
};

export default AddTodo