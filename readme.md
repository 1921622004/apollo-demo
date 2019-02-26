总算，间间断断的把这个demo写完了，算是学习一下graphql的用法，也先不去深入学习了，主要是了解用法以及概念。这个项目后台使用koa + apollo-server，前台用的react（带hooks的版本），原先打算用MongoDB，后来干脆直接读写模拟数据了，然后记录下，看看怎么写吧。

### 后台

- 模块引入
```javascript
const { ApolloServer, gql } = require('apollo-server-koa');
```

- 定义type
```javascript
const typeDefs = gql`
  type TodoItem {
    id: ID
    content: String!
    checked: Boolean
  }
  type Query {
    TodoList: [TodoItem!]
  }
  type Mutation {
    createTodo(content: String!, checked: Boolean): [TodoItem!]!
    updateTodo(content: String!, checked: Boolean, id:ID): [TodoItem!]!,
    deleteTodo(id: ID): [TodoItem!]!
  }
`;
```

- 定义resolver
```javascript
const resolvers = {
  Query: {
    TodoList: async (parent, args, context, info) => {
      const data = await readFile('./mock/index.json');
      const todoList = JSON.parse(data);
      return todoList
    }
  },
  Mutation: {
    createTodo: async (_, { content, checked }) => {
      const data = await readFile('./mock/index.json');
      let todoList = JSON.parse(data);
      todoList = todoList.concat([{
        content,
        checked,
        id: Math.round(Math.random() * 10000)
      }]);
      const writeErr = await writeFile(
        './mock/index.json',
        JSON.stringify(todoList)
      );
      return !writeErr && todoList
    }
  }
}
```

- 启动server
```javascript
const app = new Koa();

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({ app });
```

### 前端
- 入口文件
```javascript
import { ApolloProvider } from "react-apollo";
import ApolloClient from "apollo-boost";

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql',
})

const App = () => (
  <ApolloProvider client={client}>
    // 组件
  </ApolloProvider>
);
```

- query component
```javascript
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
```

- mutation component
```javascript
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
const QUERY_TODO = gql`
  {
    TodoList{
      content 
      id
      checked
    }
  }
`;

export default () => {
  return (
    <Mutation
      mutation={ADD_TODO}
      update={(cache, { data }) => {
        // 新增后修改缓存
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
```

### 最后
详细的介绍不太多，推荐大家看一下YouTube上的一套视频，[Beginner Graphql Series](https://www.youtube.com/watch?v=DyvsMKsEsyE&list=PLN3n1USn4xln0j_NN9k4j5hS1thsGibKi)，最后[代码仓库](https://github.com/1921622004/apollo-demo)