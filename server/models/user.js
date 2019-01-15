const db = require('../config/db.js'); 
const userModel = '../schema/user.js'; // 引入user表结构
const AmsDB = db.Ams; // 引入数据库

const User = AmsDB.import(userModel); // 用sequelize的import方法引入表结构，实例化了User。

const getUserById = async (id) => {
    const userInfo = await User.findOne({
        where: {
            id: id
        }
    });
    return userInfo;
}

const getUserByName = async (name) => {
    const userInfo = await User.findOne({
        where: {
            name: name
        }
    });
    return userInfo;
}


module.exports = {
    getUserById,
    getUserByName,
}