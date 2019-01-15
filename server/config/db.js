// 初始化sequelize和数据库的连接
// db.js

const Sequelize = require('sequelize');

const Ams =  new Sequelize('mysql://root:password@10.10.28.14/ams', {
    define: {
        timestamps: false, // 取消Sequelzie自动给数据表加入时间戳（createdAt以及updatedAt）
    },
    operatorsAliases: false,
})

module.exports = {
    Ams, // 将Ams暴露出接口方便Model调用
}