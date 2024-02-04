// global configuration of webpack base config
const globalConf = require('./GlobalConf');

// add webpack creators
const loadersCreator = require('./LoadersCreator');
const pluginsCreator = require('./PluginsCreator');

// webpack hooks
const webpackHooks = require('./hooks');

// base config
const { webpackBaseConfig } = require('./BaseConfig');

/** @description webpack creator, include plugins and others */
const webpackCreator = {
    loadersCreator,
    pluginsCreator,
};

module.exports = {
    globalConf,
    webpackCreator,
    webpackHooks,
    webpackBaseConfig,
};
