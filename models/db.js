/**
 * created by plj on 2017/03/14
 * @author : plj
 * @Date   : 2017/03/14
 */
'use strict';

//node_modules
var mysql = require('mysql');

//project import
var mysqlConfig = CONFIG.MYSQL;

//创建数据库连接池
var pool = mysql.createPool({
    connectionLimit : mysqlConfig.connectionLimit,
    host            : mysqlConfig.host,
    user            : mysqlConfig.user,
    password        : mysqlConfig.password,
    database        : mysqlConfig.database
});

//从连接池中取出一个connection
function getConnection(callback) {
    pool.getConnection(function(err, connection) {
        callback(err,connection);
    })
};

//每次从连接池中取出一个连接，查询完后释放
function query(sql, variable, callback) {
    var argumentsCount = arguments.length;//得到传入参数个数
    getConnection(function(err, connection) {
        if(err){
            callback(err, []);//获取查询连接失败
        }else{
            if(argumentsCount === 2){
                callback = variable;
                connection.query(sql, function(err, results) {
                    connection.release();//如果您想关闭连接并将其从池中删除，请改用connection.destroy（）。连接池将在下次需要时创建新连接。
                    callback(err, results);
                });
            }else if(argumentsCount === 3){
                //query()方法有以下三种形式：1.query(sqlString, callback),2.query(sqlString, values, callback),3.query(options, callback)
                //2中sqlString－要执行的SQL语句，values－{Array}，要应用到查询占位符的值,数组类型
                //3中{Object}，查询选项参数，如{sql: 'SELECT * FROM `books` WHERE `author` = ?',timeout: 40000, values: ['David']}
                connection.query(sql, variable, function(err, results) {
                    connection.release();
                    callback(err, results);
                });
            }else{
                callback(new Error('the number of parameter is not correct'), []);
            }
        }
    })
};

exports.query = query;
