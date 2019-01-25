const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const { ApolloServer, gql } = require('apollo-server-koa');
const fs = require('fs');

let movieList = JSON.parse(fs.readFileSync('./mock/index.json'));

const koaStatic = require('koa-static');

const typeDefs = gql`
  type MovieDetail {
    name: String!
    desc: String!
    leadingRole: String
    rate: Float
    poster: String
    id: ID
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
    addMovie(
      name:String!, 
      leadingRole:String, 
      desc:String!, 
      rate: Float, 
      poster: String, 
      alreadyWatched: Boolean = false
    ): MutateRes
    modifyMovieStatus(
      id: ID!, 
      alreadyWatched: Boolean!
    ): MutateRes
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
      return [{
        name: 'Batman',
        desc: `I'm Batman`,
        rate: 8.6,
        poster: '2',
        alreadyWatched: false
      }]
    }
  },
  Mutation: {
    addMovie: (_, { name, desc, rate, poster, alreadyWatched }) => {
      movieList.push({ name, desc, rate, poster, alreadyWatched });
      const res = fs.writeFileSync('./mock/index.json', JSON.stringify(movieList));
      console.log(res);
      return {
        code: 0,
        success: true
      }
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