/**
 * created by plj on 2017/03/14
 * @author : plj
 * @Date   : 2017/03/13
 */
'use strict'

//project import
var routes = require('./routes/index.js');
var userApi = require('./routes/user/user.js');


exports.set = function(app) {
    app.get('/', routes.index);
    app.post('/login', userApi.postLogin);
    app.post('/sign', userApi.sign);

    //针对路由不存在的情况
    app.use(function(req, res) {
        res.status(404);
        res.format({
            html : function(){
                res.render('404', {url : req.url});
            },
            json : function(){
                res.send({code : 10001, message : '路由不存在'})
            },
            text : function(){
                res.send(JSON.stringify({code : 10001, message : '路由不存在'}));
            },
            default : function(){
                LOGGER.error('Not Acceptable', req.headers);
                res.send(JSON.stringify({code : 10001, message : '路由不存在'}));
            }
        });
    });
}