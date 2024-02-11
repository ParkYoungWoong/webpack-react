const HtmlPlugin = require('html-webpack-plugin');
const { resolve } = require('path');
const { cloneDeep } = require('lodash');
const deepFreeze = require('deep-freeze-strict');

// default configuration
const defaultConf = deepFreeze({
    template: resolve(__dirname, '../../../../html/index.htm'),
    favicon: resolve(__dirname, '../../../../html/favicon.ico'),
    templateParameters: {
        lang: 'en-uk',
    },
    inject: 'body',
    title: 'Webpack project!',
});

// use html-webpack-plugin
const createHtmlPlugin = (conf = {}) =>
    new HtmlPlugin({
        ...cloneDeep(defaultConf),
        ...conf,
    });

module.exports = {
    createHtmlPlugin,
    defaultConf,
};
