const db = require('../config/db.js'); 
const StudentModel = '../schema/student.js'; // 引入Student表结构
const AmsDB = db.Ams; // 引入数据库

const Student = AmsDB.import(StudentModel); // 用sequelize的import方法引入表结构，实例化了Student。

const getStudentById = async (id) => {
    const res = await Student.findOne({
        where: {
            id: id
        },
    });
    return res;
}

const getStudents = async ({page_size, current_page, ...params}) => {
    page_size = page_size === undefined? 10: parseInt(page_size)
    current_page = current_page === undefined? 1: parseInt(current_page)
    const res = await Student.findAndCountAll({
        where: {
            ...params
        },
        limit: page_size,
        offset: (current_page - 1) * page_size,
        order: [
            [ 'id', 'DESC' ]
        ]
    });
    return {
        list: res.rows,
        pagination: {
            page_size,
            current_page,
            total: res.count
        }
    };
}

const addStudent = async (studentInfo) => {
    await Student.create(studentInfo);
    return true;
}

const deleteStudent = async ({id}) => {
    const result = await Student.destroy({
        where: {
            id
        }
    })
    if(result > 0){
        return true;
    }else{
        return false;
    }
}

const modifyStudent = async ({id, ...params}) => {
    const res = await Student.update(params, {
        where: {
            id
        }
    })
    if(res && res[0]){
        return true;
    }else{
        return false;
    }
}

module.exports = {
    getStudentById,
    getStudents,
    addStudent,
    deleteStudent,
    modifyStudent,
}