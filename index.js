'use strict';

const fs = require('fs'),
    mssql = require('mssql');

let config = require('./config'),
    configDb = require('./configDb');

/*
    TODOs
        remove MOBC credentials
*/

/*******************************
*            CONFIG            *
*******************************/

exports.logOn = (newConfig) => {
    if(typeof newConfig.console == 'boolean') config.console = newConfig.console;
    if(typeof newConfig.fs == 'boolean') config.fs = newConfig.fs;
    if(typeof newConfig.db == 'boolean') config.db = newConfig.db;
};

exports.setFsPath = (path) => {
    if(typeof path == 'string') config.path = __dirname+path;
};

exports.setDb = (db) => {
    if(typeof db.user == 'string') configDb.user = db.user;
    if(typeof db.password == 'string') configDb.password = db.password;
    if(typeof db.server == 'string') configDb.server = db.server;
    if(typeof db.database == 'string') configDb.database = db.database;
    if(typeof db.port == 'number') configDb.port = db.port;
};

exports.setDefaultProcedure = (procedure) => {
    if(typeof procedure == 'string') configDb.defaultProcedure = procedure;
};

/*******************************
*            PUT LOG           *
********************************/

exports.log = (log, onlyDb) => {

    //get date and fix time zone
    let date = new Date();
    date.setUTCHours(date.getUTCHours() - 3);

    try{

        if(typeof log == 'object') log = JSON.stringify(log);

        //write log (if enabled)
        if(!onlyDb && config.console) print(log);
        if(!onlyDb && config.fs) saveLogFile(date, log);
        if(onlyDb && config.db) return execProcedure(log);

    } catch(err){
        //try log failure
        if(config.console) print(err);
    }
};

/*******************************
*              AUX             *
********************************/

//show on console
const print = (log) => {
    console.log();
    console.log(log);
};

//save file
const saveLogFile = (date, log) => {
    const fileName = date.getUTCFullYear()+'-'+(date.getUTCMonth()+1)+'-'+date.getUTCDate()+'.log',
        time = '['+date.toUTCString()+']';
    
    if(!fs.existsSync(config.path)) fs.mkdirSync(config.path);

    fs.appendFileSync(config.path+fileName, time+' '+log+'\n');
};

//exec defaultProcedure from db (removing '," and \)
const execProcedure = (params) => {
    params = JSON.parse(params);

    mssql.close();
    
    return mssql.connect(configDb).then(pool => {
        pool = pool.request();
        if(params){
            for(let i = 0; params[i]; ++i){
                let name = params[i].name,
                    data = params[i].data;
                
                if(typeof data == 'string') data = data.replace(/'|"|\\/g, '');
    
                pool = pool.input(name, data);
            }
        }
        return pool.execute(configDb.defaultProcedure)
                    .then(result => mssql.close());
    });
};