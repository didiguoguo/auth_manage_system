const jwt = require('jsonwebtoken');

const { succResponse, errorResponse, secretKey } = require('../config/common.js');
const student = require('../models/student.js');

const getStudentInfoById = async (ctx) => {
    const id = parseInt(ctx.params.id);
    const result = await student.getStudentById(id);
    if(result){
        ctx.body = {
            ...succResponse,
            result
        };
    }else{
        ctx.body = errorResponse['400'];
    }
}

const getStudentsByFilters = async (ctx) => {
    const studentInfo  = await student.getStudents(ctx.request.query);
    ctx.body = {
        ...succResponse,
        result: studentInfo !== null? studentInfo: []
    }
}

const addStudent = async (ctx) => {
    const res = await student.addStudent(ctx.request.body);
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

const modifyStudent = async (ctx) => {
    const res  = await student.modifyStudent(ctx.request.body);
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

const deleteStudent = async (ctx) => {
    const result  = await student.deleteStudent(ctx.request.body);
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
    getStudentInfoById,
    getStudentsByFilters,
    addStudent,
    deleteStudent,
    modifyStudent,
}