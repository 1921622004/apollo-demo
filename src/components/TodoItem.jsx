import React, { useState } from "react";
import { Icon, Input, List  } from "antd";

const { Item } = List;

const TodoItem = ({ data }) => {
  const { content, checked, id } = data;
  const [isEditing, setEditing] = useState(false);
  const [value, setValue] = useState(content);
  return (
    <Item>
      <div class="todo-item">
        <Icon 
          type={checked ? "check-circle": "close-circle"}
          onClick={() => {
            
          }}
          style={{
            fontSize: "24px",
            color: checked ? "green" : "red"
          }}
        />
        {
          isEditing ? (
            <Input 
              value={value}
            />
          ) : (
            <span
              className={checked?"todo-content checked":"todo-item"}
            >
              {content}
            </span>
          )
        }
        {
          !isEditing && (
            <Icon 
              type="edit"
              onClick={() => {
                setEditing(true);
              }}
              style={{ fontSize:"24px", color: "gray" }}
            />
          )
        }
        
      </div>
      
    </Item>
  )
};

export default TodoItem