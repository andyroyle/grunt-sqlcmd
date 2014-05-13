# grunt-sqlcmd [![Build Status](https://travis-ci.org/opentable/grunt-sqlcmd.png?branch=master)](https://travis-ci.org/opentable/grunt-sqlcmd) [![NPM version](https://badge.fury.io/js/grunt-sqlcmd.png)](http://badge.fury.io/js/grunt-sqlcmd) ![Dependencies](https://david-dm.org/opentable/grunt-sqlcmd.png)

Execute sqlcmd from the command line.

Provides the task `sqlcmd`, which builds

```
grunt.initConfig({
  'sqlcmd': {
    options: {
      sqlcmd: '.\\path\\to\\sqlcmd.exe' // defaults to 'sqlcmd.exe'
    },
    'my-db': {
      src: [ 'path\\to\\files\\*.sql' ], // location of sql scripts to run
      options: {
        server: 'my.server',
        database: 'my_database',
        username: 'user',
        password: 'password'
      }
    }
  }
});
```

Usage:
```
grunt sqlcmd:my-db
```
# Future plans:

Integrate with a pure nodejs version of sqlcmd (maybe)
