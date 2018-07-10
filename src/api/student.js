const STUDENTS = new Array(3000).fill({}).map((item, index) => ({
  stu_name: `张伟${index+1}`,
  gender: index%2===0?'男':'女',
  id_card_num: 123123123123123+index,
  phone_num: 15512312312+index,
  job_title: '学生',
  enter_time: '2018.05.25',
  id: index+1,
  index: index+1,
  class: `机械${(index%60+1)}班`
}))


export default {
    getStudents(cb){
        setTimeout(()=>cb(STUDENTS),100)
    }
}
