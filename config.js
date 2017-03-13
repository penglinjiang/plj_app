/**
 * created by plj on 2017/03/13
 * @author : plj
 * @Date   : 2017/03/13
 */

'use strict';

var config = {};

config.LOG = {
    dir          : '/home/duoyi/logs/',
    mainDir      : '/home/duoyi/logs/main',
    format       : ':remote-addr :method :url :status :response-time ms :content-length',
    replaceCpnsole : true,
    level          : 'AUTO',
    console        : false
}

module.exports = config;