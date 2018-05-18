const registra = require('../index');

registra.logOn({db:true});

//registra.setFsPath('/test/');

registra.setDb({
    user: 'user name',
    password: 'pass',
    server: 'server',
    database: 'db',
    port: 0
});

registra.setDefaultProcedure('procedure name');

registra.log([{
    name: 'CodLancamento',
    data: '1'
}, {
    name: 'RespostaTransacao',
    data: 'test node-registra'
}], true);

registra.log('ok');