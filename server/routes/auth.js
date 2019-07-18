const user = require('../controllers/user.js');

const Router = require('koa-router');
const router = new Router();

router.get('/user', user.getUserInfoById); // 定义url的参数是id,用user的auth方法引入router

router.get('/currentUser', user.getCurrentUser); // 定义url的参数是id,用user的auth方法引入router

router.post('/login', user.AuthPostUser); // 登录验证

module.exports = router;