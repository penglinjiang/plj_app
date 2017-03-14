/**
 * created by plj on 2017/03/13
 * @author : plj
 * @Date   : 2017/03/13
 */

'use strict';

var config = {};

//logs日志记录配置
config.LOG = {
    dir          : '/home/duoyi/logs/',
    mainDir      : '/home/duoyi/logs/main',
    format       : ':remote-addr :method :url :status :response-time ms :content-length',
    replaceCpnsole : true,
    level          : 'AUTO',
    console        : false
};
//mysql数据库配置
config.MYSQL = {
    host               : '127.0.0.1',
    database           : 'plj',
    password           : '123456',
    user               : 'root',
    connectionLimit    : 50,//一次创建的最大连接数。
    acquireTimeout     : 10000,//在连接获取期间发生超时之前的毫秒数。这与connectTimeout稍有不同，因为获取池连接并不总是涉及建立连接。默认10000
    waitForConnections : true,//确定在没有可用的连接并且已达到限制时池的操作。如果为true，池将对连接请求排队并在有可用连接请求时调用它。如果为false，池将立即回调一个错误。默认true
    queueLimit         : 0,//在从getConnection返回错误之前，连接池将排队的最大连接请求数，如果设置为0，则对排队的连接请求数没有限制。默认值为0
}

module.exports = config;