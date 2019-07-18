const jwt = require('jsonwebtoken');

const { succResponse, errorResponse, secretKey } = require('../config/common.js');
const user = require('../models/user.js');

const getUserInfoById = async (ctx) => {
    const id = parseInt(ctx.params.id);
    const result = await user.getUserById(id);
    if(result){
        ctx.body = {
            ...succResponse,
            result
        };
    }else{
        ctx.body = errorResponse['400'];
    }
}

const getCurrentUser = async (ctx) => {
    jwt.verify(ctx.headers.Authorition, secretKey, res => {
        console.log(res);
        if(res){
            const { id } = res;
            const result = await user.getUserById(id);
            if(result){
                ctx.body = {
                    ...succResponse,
                    result
                };
            }else{
                ctx.body = errorResponse['400'];
            }
        }else{
            ctx.code = 200;
            ctx.body = errorResponse['401']
        }
    });
}

const AuthPostUser = async (ctx) => {
    const data = ctx.request.body;
    const userInfo  = await user.getUserByName(data.name);
    if(userInfo !== null){
        if(userInfo.password !== data.password){
            ctx.body = {
                code: 400,
                message: '密码错误！'
            }
        }else{
            const userToken = {
                id: userInfo.id,
                name: userInfo.name
            }
            const token = jwt.sign(userToken, secretKey);
            ctx.body = {
                ...succResponse,
                token
            }
        }
    }else{
        ctx.body = {
            code: 400,
            message: '用户不存在'
        }
    }
}

module.exports = {
    getUserInfoById,
    getCurrentUser,
    AuthPostUser
}