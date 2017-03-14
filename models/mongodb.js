/**
 * created by plj on 2017/03/14
 * @author : plj
 * @Date   : 2017/03/14
 */
'use strict';

//node_modules
var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');
assert.equal(3,3,"对的上");
//project import
var mongodbConfig = CONFIG.MONGODB;

//mongodb插入操作
exports.insert = function (collectionName, insertArray, callback) {
    mongoClient.connect(mongodbConfig.url, function(err, db){
        if(err){
            LOGGER.error('mongodb_connect_err,\tcollectionName: %s, insertArray: %s, err:%s', collectionName, JSON.stringify(insertArray), JSON.stringify(err));
            return callback(err, null);
        }
        var collection = db.collection(collectionName);
        var length = insertArray.length;
        collection.insertMany(insertArray, function(err, result){
            if(err){
                LOGGER.error('mongodb_insert_err,\tcollectionName: %s, insertArray: %s, err:%s', collectionName, JSON.stringify(insertArray), JSON.stringify(err));
                db.close();
                return callback(err, null);
            }else{
                LOGGER.info('mongodb_insert_success,collection: %s, insertArray: %s', collectionName,  JSON.stringify(insertArray));
                db.close();
                return callback(null, result.result.n);
            }
        });
    });
};

//mongodb查询操作
exports.find = function (collectionName, findObj, callback) {
    mongoClient.connect(mongodbConfig.url, function(err, db){
        if(err){
            LOGGER.error('mongodb_connect_err,\tcollectionName: %s, findObj: %s, err:%s', collectionName, JSON.stringify(findObj), JSON.stringify(err));
            return callback(err, null);
        }
        var collection = db.collection(collectionName);
        collection.find(findObj).toArray(function(err, docs){
            if(err){
                LOGGER.error('mongodb_find_err,\tcollectionName: %s, findObj: %s, err:%s', collectionName, JSON.stringify(findObj), JSON.stringify(err));
                db.close();
                return callback(err, null);
            }else{
                LOGGER.info('mongodb_find_success,collection: %s, findObj: %s', collectionName,  JSON.stringify(findObj));
                db.close();
                return callback(null, docs);
            }
        });
    });
};

//mongodb更新操作
exports.update = function (collectionName, condition, updateValue, callback) {
    mongoClient.connect(mongodbConfig.url, function(err, db){
        if(err){
            LOGGER.error('mongodb_connect_err,\tcollectionName: %s, condition: %s, updateValue: %s, err:%s', collectionName, JSON.stringify(condition), JSON.stringify(updateValue), JSON.stringify(err));
            return callback(err, null);
        }
        var collection = db.collection(collectionName);
        collection.updateOne(condition, updateValue, function(err, result){
            if(err){
                LOGGER.error('mongodb_update_err,\tcollectionName: %s, condition: %s, updateValue: %s, err:%s', collectionName, JSON.stringify(condition), JSON.stringify(updateValue), JSON.stringify(err));
                return callback(err, null);
            }else{
                LOGGER.info('mongodb_update_success,\tcollectionName: %s, condition: %s, updateValue: %s', collectionName, JSON.stringify(condition), JSON.stringify(updateValue));
                return callback(null, result.result.n);
            }
        });
    });
};

//mongodb删除操作
exports.delete = function (collectionName, condition, callback) {
    mongoClient.connect(mongodbConfig.url, function(err, db){
        if(err){
            LOGGER.error('mongodb_connect_err,\tcollectionName: %s, condition: %s, err:%s', collectionName, JSON.stringify(condition),  JSON.stringify(err));
            return callback(err, null);
        }
        var collection = db.collection(collectionName);
        collection.deleteOne(condition, function(err, result){
            if(err){
                LOGGER.error('mongodb_delete_err,\tcollectionName: %s, condition: %s, err:%s', collectionName, JSON.stringify(condition),  JSON.stringify(err));
                return callback(err, null);
            }else{
                LOGGER.info('mongodb_delete_success,\tcollectionName: %s, condition: %s', collectionName, JSON.stringify(condition));
                return callback(null, result.result.n);
            }
        });
    })
}

