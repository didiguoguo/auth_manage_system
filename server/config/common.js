module.exports = {
    errorResponse: {//错误返回信息
        400: {
            code: 400,
            message: 'param error'
        },
        401: {
            code: 401,
            message: 'not authorized'
        },
        404: {
            code: 404,
            message: 'not found'
        },
        500: {
            code: 500,
            message: 'server error'
        },
    },
    succResponse: {//成功返回信息
        code: 200,
        message: 'succ'
    },
    secretKey: 'xixixi',
    port: 8080
}
