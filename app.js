const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router');
const router = new Router()
const Json = require('koa-json');
const Logger = require('koa-logger');
const BodyParser = require('koa-bodyparser');
const jwt = require('koa-jwt')
const Historyapifallback = require('koa-history-api-fallback')
const KoaStatic = require('koa-static')
const path = require('path')
// const cors = require('koa2-cors');

const { errorResponse, secretKey, port } =  require('./server/config/common.js')

const auth = require('./server/routes/auth.js');
const api = require('./server/routes/api.js');

app.use(new BodyParser());
app.use(new Json());
app.use(new Logger())

app.use(async (ctx, next) => {  //  如果JWT验证失败，返回验证失败信息
    try {
        await next();
    } catch (err) {
        if (401 == err.status) {
            ctx.status = 401;
            ctx.body = {
                ...errorResponse['401']
            };
        } else {
            throw err;
        }
    }
});

// app.use(cors({
//     origin: function (ctx) {
//         return "*";
//         if (ctx.url === '/test') {
//             return "*"; // 允许来自所有域名请求
//         }
//         return 'http://localhost:8080'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
//     },
//     exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
//     maxAge: 5,
//     credentials: true,
//     allowMethods: ['GET', 'POST', 'DELETE', 'PATCH'],
//     allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'token'],
// }))

app.on('error', function(err, ctx){
    console.log('server error', err)
})

router.use('/auth', auth.routes())
// router.use('/api', api.routes())
router.use('/api', jwt({secret: secretKey}), api.routes())

app.use(router.routes());
app.use(new Historyapifallback())
app.use(KoaStatic(path.resolve('dist')))

app.listen(port, () => {
    console.log('Koa service is listening on port ' + port);
})

module.exports = app;
