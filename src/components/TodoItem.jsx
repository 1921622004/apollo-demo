import React, { useState } from "react";
import { Icon, Input, List, Checkbox } from "antd";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const { Item } = List;

const UPDATE_TODO = gql`
  mutation UpdateTodo($content: String!, $id: ID, $checked: Boolean) {
    updateTodo(content: $content, id: $id, checked: $checkde){
      content
      id
      checked
    }
  }
`;
const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID) {
    deleteTodo(id: $id) {
      content
      id
      checkde
    }
  }
`

const TodoItem = ({ data }) => {
  const { content, checked, id } = data;
  const [isEditing, setEditing] = useState(false);
  const [value, setValue] = useState(content);
  const inputHandler = (ev) => {
    const val = ev.target.value;
    setValue(val);
  };
  return (
    <Item>
      <div class="todo-item">
        <Checkbox
          checked={checked}
          disabled={!isEditing}
          style={{
            fontSize: "24px",
            color: checked ? "green" : "red"
          }}
        />
        {
          isEditing ? (
            <Input
              value={value}
              style={{ width: 400 }}
              onChange={inputHandler}
            />
          ) : (
              <span
                className={checked ? "todo-content checked" : "todo-content"}
              >
                {content}
              </span>
            )
        }
        <div style={{ width: 80, textAlign: "center" }}>
          <Icon
            type={isEditing ? "save" : "edit"}
            onClick={() => {
              setEditing(!isEditing);
            }}
            style={{ fontSize: "24px", color: "gray" }}
          />
          {
            !isEditing && (
              <Icon
                type="close"
                style={{ fontSize: "24px", color: "red", marginLeft: "12px" }}
              />
            )
          }
        </div>
      </div>
    </Item>
  )
};

export default TodoItem