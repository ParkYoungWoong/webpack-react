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
        hashFunction: 'xxhash64',
        path: pathResolve(__dirname, '../../dist'),
        publicPath: pathResolve(__dirname, '../..'),
        filename: 'js/[name].[contenthash].bundle.js',
        chunkFilename: 'js/[name].[contenthash].js',
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
