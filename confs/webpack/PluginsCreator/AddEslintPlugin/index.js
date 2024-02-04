const ESLintPlugin = require('eslint-webpack-plugin');
const { extensions } = require('../../GlobalConf');

// default configuration
const defaultConf = Object.freeze({
    extensions,
    fix: true,
    threads: true,
});

// use eslint-webpack-plugin
const createEslintPlugin = (conf = defaultConf) => new ESLintPlugin(conf);

module.exports = {
    createEslintPlugin,
    defaultConf,
};
