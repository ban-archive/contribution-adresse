// Karma configuration
module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai'],

    files: [
      // all files ending in ".test"
      {pattern: 'front/src/**/*.test.js', watched: false}
      // each file acts as entry point for the webpack configuration
    ],

    preprocessors: {
      // add webpack as preprocessor
      'front/src/**/*.test.js': ['webpack']
    },

    webpack: {
      "module": {
        "rules": [
          {
            "test": /\.js$/,
            "exclude": /node_modules/,
            "loader": 'babel-loader',
            "options": {
              "presets": ["env"],
              "plugins": [
                "transform-decorators-legacy",
                ["transform-react-jsx", { "pragma":"h" }]
              ]
            }
          }
        ]
      },
      externals: {
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
        'react/addons': true,
        'react-dom/lib/ReactTestUtils': true,
        'react/lib/getNextDebugID': true,
        'react/lib/ReactCurrentOwner': true,
        'react/lib/ReactComponentTreeHook': true,
        'react/lib/React': true,
        'react-dom/test-utils': true
      },
      "resolve": {
        "alias": {
          "react-dom/server": "preact-render-to-string",
          "react-addons-test-utils": "preact-test-utils",
          "react": "preact-compat-enzyme",
          "react-dom": "preact-compat-enzyme",
          "react-addons-transition-group": "preact-transition-group"
        }
      }
    },

    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    },

    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-chai',
      'karma-phantomjs-launcher'
    ],
  });
};
