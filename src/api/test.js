const TESTS = new Array(3000).fill({}).map((item, index) => ({
    test_name: `装调考试`,
    type: '模拟考试',
    test_work_type: '操作工',
    test_target: '机械1班',
    test_duration: 120,
    test_cycle: '2018.07.25-2018.08.25',
    test_times: 1,
    status: index%5,
    index: index+1
  }))
  
  
  export default {
      getTests(cb){
          setTimeout(()=>cb(TESTS),100)
      }
  }
  