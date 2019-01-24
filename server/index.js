const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const { ApolloServer, gql } = require('apollo-server-koa');

const koaStatic = require('koa-static');

const typeDefs = gql`
  enum Sex {
    male
    female
  }
  enum Identity {
    student
    teacher
  }
  type LessonDetail {
    lessonName: String
    lessonDesc: String
    lId: ID
    maxStudent: Number
    currentStudent: Number
  }
  type StudentDetail {
    sID: ID
    name: String!
    type: Identity
    sex: Number
    createTime: String
    updateTime: String
  }
  type Query {
    getLessonList(pageNum: Number = 1, pageSize: Number = 10, lessonName: String!) {
      lessonName: String
      lessonDesc: String
      lId: ID
      status: Boolean
    },
    getlessonDetail(lId): LessonDetail,
    login(sID:Number, password: String) {
      sID: ID
      name: String
      type: Identity
      sex: Sex,
      chosedLesson: [LessonDetail!]!
      ownedLesson: [LessonDetail!]!
    }
  }
  type Mutation {
    createLesson(lessonName: String, lessonDesc: String, maxStudent: Number) {
      lID: ID
    },
    chooseLesson(sId: Number, lId: Number){
      lID: ID
    }
  }
`;

const resolvers = {
  Query: {
    getLessonList: (...arg) => {
      console.log(arg);
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