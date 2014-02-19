'use strict';

module.exports = function(grunt){
    grunt.registerMultiTask('deploy-sql', function(){
        var cp = require('child_process'),
            f = require('util').format,
            async = require('async'),
            verbose = grunt.verbose,
            log = grunt.log,
            done = this.async(),
            options = this.options({
                sqlcmd: 'sqlcmd.exe'
            }),
            command = [
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

        verbose.writeflags(options, 'Options');

        var commands = [];

        this.filesSrc.forEach(function(filepath) {
            commands.push(command + " -i " + filepath);
        });

        var execute = function(command, finished){
            verbose.subhead(command);
            var childProcess = cp.exec(command, {}, function(){});

            childProcess.stdout.on('data', function (d) { log.write(d); });
            childProcess.stderr.on('data', function (d) { log.error(d); });

            childProcess.on('exit', function(code) {
                if (code !== 0) {
                    log.error(f('Exited with code: %d.', code));
                    return done(false);
                }

                verbose.ok(f('Exited with code: %d.', code));
                finished();
            });
        };

        async.forEach(commands, execute, function(){
            done();
        });
    });
};