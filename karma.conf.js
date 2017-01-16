// Karma configuration
// Generated on Wed Jan 04 2017 12:46:00 GMT+0200 (EET)

module.exports = function(config) {
    config.set({
        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: [
            'browserify',
            'jasmine',
        ],
        plugins: [
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-html2js-preprocessor',
            'karma-browserify',
            "karma-jasmine-html-reporter"
        ],
        browserify: {
            debug: true,
            transform: [["babelify", { "presets": ["es2015"] }]]
        },
        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',

        // list of files / patterns to load in the browser
        files: [
            // 'src/originalAssets/app/**/*.js',
            'src/originalAssets/tests/**/*.js'
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/originalAssets/app/**/*.html'   : ['html2js'],
            'src/originalAssets/app/**/*.js'   : ['browserify'],
            'src/originalAssets/tests/**/*.js': ['browserify']
        },

        html2JsPreprocessor: {
            stripPrefix: 'src/originalAssets/app/components/',
            processPath: function(filePath) {
                // Drop the file extension
                return filePath.replace(/\.html$/, '');
            }
        },
        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        // reporters: ['kjhtml'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        // Concurrency level
        // how many browser should be started simultaneous
        // concurrency: Infinity
    })
}
