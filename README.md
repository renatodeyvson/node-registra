# registra
A log module for nodejs, easy to set up, using console, file or db

# installing

```sh
> npm i registra
```

# example

```js
const registra = require('registra');

//set up to log on console
registra.logOn({ console: true });

//simple log
registra.log('Hello, registra!');
```

# set up

```js
//changing log type
//default { console: false, fs: false, db: false }
//console - log on console using console.log()
//fs - log on file using fs
//db - log on database usin mssql (only by procedure)
registra.logOn({ fs:true });

//setting where write log file
registra.setFsPath(__dirname+'/logs/');

//db credentials
registra.setDb({
    user: 'USER_NAME',
    password: 'Pas$',
    server: '0.0.0.0',
    database: 'DB',
    port: 0
});

//which procedure run to log
registra.setDefaultProcedure('procedure name');
```

# example with database (mssql)

```js
const registra = require('registra');

//set up db
registra.logOn({ db:true });
registra.setDb({
    user: 'USER_NAME',
    password: 'Pas$',
    server: '0.0.0.0',
    database: 'DB',
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
}]);
```

# log without change logOn config

```js
//set up to stop log on fs
registra.logOn({ fs: false });

//force log on fs
registra.log('Now you see it...', { fs: true });

//try log without force
registra.log('Now you don\'t see');
```