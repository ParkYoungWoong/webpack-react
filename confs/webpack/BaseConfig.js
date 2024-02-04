const { resolve: pathResolve } = require('path');
const deepFreeze = require('deep-freeze-strict');
const { createAlias, createEntry, createLoaders, createPlugins, createDevServerConf } = require('./hooks');
const { extensions } = require('./GlobalConf');

const webpackBaseConfig = deepFreeze({
    entry: createEntry(),
    resolve: {
        extensions,
        alias: createAlias(),
    },
    output: {
        path: pathResolve(__dirname, '../../dist'),
        filename: '[name].[contenthash].bundle.js',
        clean: true,
    },
    module: {
        rules: createLoaders().getConfigOfLoaders(),
    },
    plugins: createPlugins().getPluginConfig(),
    devServer: createDevServerConf(),
});

module.exports = {
    webpackBaseConfig,
};
