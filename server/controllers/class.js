const jwt = require('jsonwebtoken');

const { succResponse, errorResponse, secretKey } = require('../config/common.js');
const classes = require('../models/class.js');

const getClassesInfoById = async (ctx) => {
    const id = parseInt(ctx.params.id);
    const result = await classes.getClassesById(id);
    if(result){
        ctx.body = {
            ...succResponse,
            result
        };
    }else{
        ctx.body = errorResponse['400'];
    }
}

const getClassessByFilters = async (ctx) => {
    const classesInfo  = await classes.getClassess(ctx.request.query);
    ctx.body = {
        ...succResponse,
        result: classesInfo !== null? classesInfo: []
    }
}

const addClasses = async (ctx) => {
    const res = await classes.addClasses(ctx.request.body);
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

const modifyClasses = async (ctx) => {
    const res  = await classes.modifyClasses(ctx.request.body);
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

const deleteClasses = async (ctx) => {
    const result  = await classes.deleteClasses(ctx.request.body);
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
    getClassesInfoById,
    getClassessByFilters,
    addClasses,
    deleteClasses,
    modifyClasses,
}