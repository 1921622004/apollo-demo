const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const { ApolloServer, gql } = require('apollo-server-koa');
const cors = require('@koa/cors');

const { readFile, writeFile } = require('./utils');

const koaStatic = require('koa-static');

const typeDefs = gql`
  type TodoItem {
    id: ID
    content: String
    checked: Boolean
  }
  type Query {
    TodoList: [TodoItem!]
  }
  type Mutation {
    createTodo(content: String!, checked: Boolean): [TodoItem!]!
    checkTodo(id: ID): [TodoItem!]!
  }
`;

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
    },
    checkTodo: async (_, { id }) => {
      const data = await readFile('./mock/index.json');
      const todoList = JSON.parse(data);
      todoList.forEach((item) => {
        const { id, checked } = item;
        if (item.id === id) {
          item.checked = !checked
        }
      });
      const writeErr = await writeFile(
        './mock/index.json',
        JSON.stringify(todoList)
      );
      return !writeErr && todoList
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const app = new Koa();

server.applyMiddleware({ app });

app.use(cors());
app.use(koaStatic('build'));
app.use(bodyParser());

app.listen(3000);