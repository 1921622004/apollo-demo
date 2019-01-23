const Koa = require('koa');

const app = new Koa();
console.log('11111');
console.log(1111);


app.use(ctx => {
    ctx.body = "hello world!"
});

app.listen(3000);