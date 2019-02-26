import React, { useState } from "react";
import { Icon, Input, List, Checkbox, Modal } from "antd";
import { adopt } from "react-adopt";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const { Item } = List;
const { confirm } = Modal;

const QUERY_TODO = gql`
  {
    TodoList{
      content
      id
      checked
    }
  }
`;

const UPDATE_TODO = gql`
  mutation UpdateTodo($content: String!, $id: ID, $checked: Boolean) {
    updateTodo(content: $content, id: $id, checked: $checked){
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
      checked
    }
  }
`;

const Container = adopt({
  updateHandler: ({ render }) => (
    <Mutation
      mutation={UPDATE_TODO}
      update={(cache, { data }) => {
        console.log(data);
        cache.writeQuery({
          query: QUERY_TODO,
          data: {
            TodoList: data.updateTodo
          }
        })
      }}
    >
      {render}
    </Mutation>
  ),
  deleteHandler: ({ render }) => (
    <Mutation
      mutation={DELETE_TODO}
      update={(cache, { data }) => {
        cache.writeQuery({
          query: QUERY_TODO,
          data: {
            TodoList: data.deleteTodo
          }
        })
      }}
    >
      {render}
    </Mutation>
  )
})

const TodoItem = ({ data }) => {
  const { content, checked, id } = data;
  const [isEditing, setEditing] = useState(false);
  const [value, setValue] = useState(content);
  const [isChecked, setIsChecked] = useState(checked);
  const inputHandler = (ev) => {
    const val = ev.target.value;
    setValue(val);
  };
  const checkHandler = ev => {
    const val = ev.target.value;
    setIsChecked(val)
  };
  return (
    <Container>
      {({ deleteHandler, updateHandler }) => (
        <Item>
          <div className="todo-item">
            <Checkbox
              defaultChecked={checked}
              disabled={!isEditing}
              onChange={checkHandler}
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
                  if (isEditing) {
                    updateHandler({ variables: { id, content: value, checked: isChecked } });
                    setEditing(!isEditing);
                  } else {
                    setEditing(!isEditing);
                  }
                }}
                style={{ fontSize: "24px", color: "gray" }}
              />
              {
                !isEditing && (
                  <Icon
                    type="close"
                    style={{ fontSize: "24px", color: "red", marginLeft: "12px" }}
                    onClick={() => {
                      confirm({
                        title: "确定要删除这项代办吗？",
                        onOk: () => {
                          deleteHandler({ variables: { id } })
                        }
                      })
                    }}
                  />
                )
              }
            </div>
          </div>
        </Item>
      )}
    </Container>
  )
};

export default TodoItem