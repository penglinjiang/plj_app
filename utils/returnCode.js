/**
 * created by plj on 2017/03/14
 * @author : plj
 * @Date   : 2017/03/14
 */
'use strict';
/**
 * 0:成功
 * 10：参数问题
 * 20：mysql数据库问题
 * 100:服务器错误
 */
function returnCode(type, data) {
    var returnMsg = {};
    switch(type){
        case 'success' :
            returnMsg = {
                code : 0,
                message : '请求成功'
            };
            break;
        case 'parameter_lack' :
            returnMsg = {
                code : 1001,
                message : '缺少必要参数'
            };
            break;
        case 'parameter_error' :
            returnMsg = {
                code : 1002,
                message : '参数错误'
            };
            break;
        case 'parameter_used' :
            returnMsg = {
                code : 1003,
                message : '账号已被注册'
            };
            break;
        case 'mysql_error' :
            returnMsg = {
                code : 2001,
                message : 'mysql查询出错'
            };
            break;
        default :
            returnMsg = {
                code : 10000,
                message : '未知错误'
            };
            break;
    }
    if(!data) {
        returnMsg.data = data;
    }
    return returnMsg;
}

module.exports = returnCode;