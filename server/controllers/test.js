const jwt = require('jsonwebtoken');

const { succResponse, errorResponse, secretKey } = require('../config/common.js');
const test = require('../models/test.js');

const getTestInfoById = async (ctx) => {
    const id = parseInt(ctx.params.id);
    const result = await test.getTestById(id);
    if(result){
        ctx.body = {
            ...succResponse,
            result
        };
    }else{
        ctx.body = errorResponse['400'];
    }
}

const getTestsByFilters = async (ctx) => {
    const testInfo  = await test.getTests(ctx.request.query);
    ctx.body = {
        ...succResponse,
        result: testInfo !== null? testInfo: []
    }
}

const addTest = async (ctx) => {
    const res = await test.addTest(ctx.request.body);
    if(res){
        ctx.body = {
            ...succResponse,
        }
    }else{
        ctx.body = {
            ...errorResponse['400'],
        }
    }
}

const modifyTest = async (ctx) => {
    const res  = await test.modifyTest(ctx.request.body);
    if(res){
        ctx.body = {
            ...succResponse,
        }
    }else{
        ctx.body = {
            ...errorResponse['400'],
            message: 'modify failed'
        }
    }
}

const deleteTest = async (ctx) => {
    const result  = await test.deleteTest(ctx.request.body);
    if(result){
        ctx.body = {
            ...succResponse,
        }
    }else{
        ctx.body = {
            ...errorResponse['400'],
            message: 'delete failed'
        }
    }
}

module.exports = {
    getTestInfoById,
    getTestsByFilters,
    addTest,
    deleteTest,
    modifyTest,
}