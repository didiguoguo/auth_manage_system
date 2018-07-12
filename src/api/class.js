const CLASSES = new Array(60).fill({}).map((item, index) => ({
    class_name: `机械${index+1}班`,
    index: index+1,
    begin_time: '2018.05.25',
    end_time: '2018.06.25',
    begin_addr: '高德',
    course_plan: '查看详情',
    create_time: '2018.05.25',
    id: index+1,
    index: index+1,
    class_number: 50,
  }))
  
  
  export default {
      getClasses(cb){
          setTimeout(()=>cb(CLASSES),100)
      }
  }