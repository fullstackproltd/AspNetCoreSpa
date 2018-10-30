require('ts-node/register');
var path = require('path');

exports.config = {
    baseUrl: 'https://127.0.0.1:5050/',

    // use `npm run e2e`
    specs: [
        path.resolve(__dirname, 'e2e/**/**.e2e.ts'),
        path.resolve(__dirname, 'e2e/**/*.e2e.ts')
    ],
    exclude: [],

    framework: 'jasmine2',

    allScriptsTimeout: 110000,

    jasmineNodeOpts: {
        showTiming: true,
        showColors: true,
        isVerbose: false,
        includeStackTrace: false,
        defaultTimeoutInterval: 400000
    },
    directConnect: true,

    capabilities: {
        'browserName': 'chrome',
        'chromeOptions': {
            'args': ['show-fps-counter=true']
        }
    },

    onPrepare: function () {
        browser.ignoreSynchronization = true;
    },

    /**
     * Angular 2 configuration
     *
     * useAllAngular2AppRoots: tells Protractor to wait for any angular2 apps on the page instead of just the one matching
     * `rootEl`
     */
    useAllAngular2AppRoots: true
};
