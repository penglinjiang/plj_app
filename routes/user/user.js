/**
 * created by plj on 2017/03/14
 * @author : plj
 * @Date   : 2017/03/14
 */
'use strict';


//project import
var db = require('../../models/db.js');

//登陆验证接口
exports.postLogin = function(req, res) {
    var userName = req.body.userName;
    var password = req.body.password;
    if(!userName || !password){
        LOGGER.error('url:%s, para:%s, err:%s', req.url,JSON.stringify({userName:userName,password:password}),'parameter_lack');
        return res.json(RETURNCODE('parameter lack'));
    }
    var sqlStr = 'SELECT * FROM user WHERE username = ?';
    db.query(sqlStr, [userName], function(err, results) {
        if(err){
            LOGGER.error('url:%s, db_error:%s', req.url, JSON.stringify(err));
            return res.json(RETURNCODE('mysql_error'));
        }else{
            var user = results && typeof results === 'string' ? JSON.parse(results)[0] : results[0];
            if(user.password !== password){
                LOGGER.error('url:%s, para:%s, err:%s', req.url,JSON.stringify({userName:userName,password:password}),'parameter_error');
                return res.json(RETURNCODE('parameter_error'));
            }else{
                return res.json(RETURNCODE('success'));
            }
        }
    });
};

//注册接口
exports.sign = function(req, res) {
    var userName = req.body.userName;
    var password = req.body.password;
    if(!userName || !password){
        LOGGER.error('url:%s, para:%s, err:%s', req.url,JSON.stringify({userName:userName,password:password}),'parameter_lack');
        return res.json(RETURNCODE('parameter lack'));
    }
    var sqlStr = 'SELECT * FROM user WHERE username = ?';
    db.query(sqlStr, [userName], function(err, results){
        if(err){
            LOGGER.error('url:%s, db_error:%s', req.url, JSON.stringify(err));
            return res.json(RETURNCODE('mysql_error'));
        }else{
            var user = results && typeof results === 'string' ? JSON.stringify(results) : results;
            if(user.length > 0){
                return res.json(RETURNCODE('parameter_used'));
            }
            sqlStr = 'INSERT INTO user (username,password) values(?,?)';
            db.query(sqlStr, [userName, password], function(err, results){
                if(err){
                    LOGGER.error('url:%s, db_error:%s', req.url, JSON.stringify(err));
                    return res.json(RETURNCODE('mysql_error'));
                }else{
                    return res.json(RETURNCODE('success'));
                }
            })
        }
    });
};