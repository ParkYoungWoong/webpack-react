const { DefinePlugin } = require('webpack');

// default configuration
const defaultConf = Object.freeze({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
});

// use eslint-webpack-plugin
const createDefinePlugin = (conf = defaultConf) => new DefinePlugin(conf);

module.exports = {
    createDefinePlugin,
    defaultConf,
};
