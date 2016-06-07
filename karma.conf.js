'use strict';
module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['mocha'],
        files: [
            'src/lib/*.js'
        ],
        exclude: [],
        preprocessors: {
            'src/lib/*.js': ['coverage']
        },
        coverageReporter: {type: 'html', dir: 'coverage/'},
        reporters: ['dots', 'progress', 'coverage'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        plugins: ['karma-mocha', 'karma-coverage', 'karma-phantomjs-launcher'],
        browsers: ['PhantomJS'],
        singleRun: true

    });
};
