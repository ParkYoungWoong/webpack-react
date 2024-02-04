/** @description webpack use hooks and basic conf */

const { webpackCreator, webpackBaseConfig, webpackHooks } = require('./webpack');

module.exports = {
    // webpack creator
    webpackCreator,
    // webpack hooks
    webpackHooks,
    // webpack basic config
    webpackBaseConfig,
};
