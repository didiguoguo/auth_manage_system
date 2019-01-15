const db = require('../config/db.js'); 
const ClassesModel = '../schema/class.js'; // 引入Classes表结构
const AmsDB = db.Ams; // 引入数据库

const Classes = AmsDB.import(ClassesModel); // 用sequelize的import方法引入表结构，实例化了Classes。

const getClassesById = async (id) => {
    const res = await Classes.findOne({
        where: {
            id: id
        },
    });
    return res;
}

const getClassess = async ({page_size, current_page, ...params}) => {
    page_size = page_size === undefined? 10: parseInt(page_size)
    current_page = current_page === undefined? 1: parseInt(current_page)
    const res = await Classes.findAndCountAll({
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

const addClasses = async (data) => {
    await Classes.create(data);
    return true;
}

const deleteClasses = async ({id}) => {
    const result = await Classes.destroy({
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

const modifyClasses = async ({id, ...params}) => {
    const res = await Classes.update(params, {
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
    getClassesById,
    getClassess,
    addClasses,
    deleteClasses,
    modifyClasses,
}