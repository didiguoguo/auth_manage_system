const db = require('../config/db.js'); 
const TestModel = '../schema/test.js'; // 引入Test表结构
const AmsDB = db.Ams; // 引入数据库

const Test = AmsDB.import(TestModel); // 用sequelize的import方法引入表结构，实例化了Test。

const getTestById = async (id) => {
    const res = await Test.findOne({
        where: {
            id: id
        },
    });
    return res;
}

const getTests = async ({page_size, current_page, ...params}) => {
    page_size = page_size === undefined? 10: parseInt(page_size)
    current_page = current_page === undefined? 1: parseInt(current_page)
    const res = await Test.findAndCountAll({
        where: {
            ...params
        },
        limit: page_size,
        offset: (current_page - 1) * page_size,
        order: [
            [ 'id', 'DESC' ]
        ]
    });
    return  {
        list: res.rows,
        pagination: {
            page_size,
            current_page,
            total: res.count
        }
    };
}

const addTest = async (testInfo) => {
    await Test.create(testInfo);
    return true;
}

const deleteTest = async ({id}) => {
    const result = await Test.destroy({
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

const modifyTest = async ({id, ...params}) => {
    const res = await Test.update(params, {
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
    getTestById,
    getTests,
    addTest,
    deleteTest,
    modifyTest,
}