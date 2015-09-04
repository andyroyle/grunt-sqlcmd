'use strict';

module.exports = function(grunt){

    grunt.registerMultiTask('sqlcmd', function(){
        var cp = require('child_process'),
            f = require('util').format,
            async = require('async'),
            verbose = grunt.verbose,
            log = grunt.log,
            done = this.async(),
            options = this.options({
                sqlcmd: 'sqlcmd.exe'
            });

        var command = [
            options.sqlcmd,
            "-S",
            options.server,
            "-d",
            options.database,
            "-U",
            options.username,
            "-P",
            options.password
        ].join(" ");

        if (options.removeNumbering === true) {
            command += ' -n';
        }

        if (options.enableQuotedIdentifiers === true) {
            command += ' -I';
        }

        verbose.writeflags(options, 'Options');

        var commands = [];
        var hasError = false;

        this.filesSrc.forEach(function(filepath) {
            commands.push(command + " -i " + filepath);
        });

        var execute = function(command, finished){
            verbose.subhead(command);
            var childProcess = cp.exec(command, {}, function(){});

            childProcess.stdout.on('data', function (d) { verbose.write(d); });
            childProcess.stderr.on('data', function (d) { log.error(d); });

            childProcess.on('exit', function(code) {
                if(code !== 0){
                    hasError = true;
                }
                verbose.ok('Exited with code: %d', code);
                finished();
            });
        };

        async.forEach(commands, execute, function(){
            
            if(hasError){
                grunt.fail.fatal('sqlcmd exited with non-zero code, see above for details');
            }

            done();
        });
    });
};