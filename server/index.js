const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const { ApolloServer, gql } = require('apollo-server-koa');

const koaStatic = require('koa-static');

const typeDefs = gql`
  type lessonDetail {
    lessonName: String,
    lessonDesc: String,
    lId: ID,
    maxStudeng: Number,
    currentStudeng: Number
  }
  type Query {
    getLessonList(pageNum?:Number, pageSize?: Number, lessonName?: String): {
      lessonName
      lId
      status
    },
    getlessonDetail(lId):{
      lessonDetail
    }
  }
`;

const resolvers = {
  Query: {
    hello: () => "hello world"
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const app = new Koa();

server.applyMiddleware({ app });

app.use(koaStatic('build'));
app.use(bodyParser());

app.listen(3000);