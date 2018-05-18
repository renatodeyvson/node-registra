# registra
A log module for nodejs, easy to set up, using console, file or db

# installing

```sh
> npm install registra
```

# example

```js
const registra = require('registra');

//simple log (only console or fs)
registra.log('Hello, registra!');
```

# set up

```js
//changing log type
//default { console: true, fs: true, db: false }
//console - log on console using console.log()
//fs - log on file using fs
//db - log on database usin mssql (only by procedure)
registra.logOn({db:true});

//setting where write log file
registra.setFsPath('/test/');

//db credentials
registra.setDb({
    user: 'user name',
    password: 'pass',
    server: 'server',
    database: 'db',
    port: 0
});

//which procedure run to log
registra.setDefaultProcedure('procedure name');
```

# example with database (mssql)

```js
const registra = require('registra');

//set up db
registra.logOn({db:true});
registra.setDb({
    user: 'user name',
    password: 'pass',
    server: 'server',
    database: 'db',
    port: 0
});
registra.setDefaultProcedure('procedure name');

//simple log with two parameters
registra.log([{
    name: 'Param1',
    data: '1'
}, {
    name: 'Param2',
    data: 'test node-registra'
}], true);
```