enum status {
    有效：0,
    无效：1
}

enum sex: {
    male: 0,
    female: 1
}

enum grade: {
    fresh:
}

课程列表：
lessonList:[{
    lessonName: String!,
    lessonDesc: String,
    lId: ID!,
    maxStudent: Number!,
    currentStudent: number!
    status: status!,
}]

课程详情
lessonDetail :{
    lessonName: String!,
    lessonDesc: String,
    lId: ID!,
    maxStudent: Number!,
    status: status!,
    curStuList:[Student!]
}

学生详情 
stuDetail: {
    name: String!,
    sex: sex!,
    grade: grade!, 
    sid: ID!,
    nickname: String,
    createTime: time,
    updateTime: time,
    choosedLesson: [lessonDetail!]
}