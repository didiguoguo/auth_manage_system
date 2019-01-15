const student = require('../controllers/student.js');
const classes = require('../controllers/class.js');
const test = require('../controllers/test.js');

const Router = require('koa-router');
const router = new Router();



router.get('/student/:id', student.getStudentInfoById); // 按id查询student

router.get('/students', student.getStudentsByFilters); // 条件查询student

router.post('/student', student.addStudent); // 添加student

router.patch('/student', student.modifyStudent); // 修改student

router.delete('/student', student.deleteStudent); // 删除student




router.get('/class/:id', classes.getClassesInfoById); // 按id查询class

router.get('/classes', classes.getClassessByFilters); // 条件查询class

router.post('/class', classes.addClasses); // 添加class

router.patch('/class', classes.modifyClasses); // 修改class

router.delete('/class', classes.deleteClasses); // 删除class




router.get('/test/:id', test.getTestInfoById); // 按id查询test

router.get('/tests', test.getTestsByFilters); // 条件查询test

router.post('/test', test.addTest); // 添加test

router.patch('/test', test.addTest); // 修改test

router.delete('/test', test.deleteTest); // 删除test




module.exports = router;