//import index file (the registra module)
const registra = require('../index');

//set up to log on console
registra.logOn({ console: true });

//simple log
registra.log('Hello, registra!');

//set up to log on file
registra.logOn({ fs:true });

//setting where write log file
registra.setFsPath(__dirname+'/logs/');

//simple log
registra.log('Hello, registra!');

//set up to log on db
registra.logOn({ db: true });

//db credentials
registra.setDb({
    user: 'USER_NAME',
    password: 'Pas$',
    server: '0.0.0.0',
    database: 'DB',
    port: 0
});

//which procedure run to log
registra.setDefaultProcedure('Procedure_name');

//simple log on db with two params
registra.log([{
    "name": "Param1",
    "data": 0
},{
    "name": "Param2",
    "data": "test!"
}]).then(() => {

    //set up to stop log on fs
    registra.logOn({ fs: false });

    //force log on fs
    registra.log('Now you see it...', { fs: true });

    //try log without force
    registra.log('Now you don\'t see');

});