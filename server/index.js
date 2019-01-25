const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const { ApolloServer, gql } = require('apollo-server-koa');

const koaStatic = require('koa-static');

const typeDefs = gql`
  type MovieDetail {
    name: String!
    desc: String!
    rate: Float
    poster: String!
    alreadyWatched: Boolean
  }
  type MutateRes {
    code: Int
    success: Boolean
  }
  type Query {
    getWatchedList(pageSize: Int! = 10, pageNum: Int! = 10): [MovieDetail!]
    getUnwatchList(pageSize: Int! = 10, pageNum: Int! = 10): [MovieDetail!]
  }
  type Mutation {
    addMovie: MutateRes
    modifyMovieStatus: MutateRes
  }
`;

const resolvers = {
  Query: {
    getUnwatchList: async (parent, args, context, info) => {
      const a = await new Promise(resolve => {
        setTimeout(() => {
          resolve(2)
        }, 3000);
      })
      console.log(a);
      return [{
        name: 'Batman',
        desc: `I'm Batman`,
        rate: 8.6,
        poster: 'a',
        alreadyWatched: false
      }]
    }
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