const { createEslintPlugin, defaultConf: eslintPluginDefaultConf } = require('./AddEslintPlugin');
const { createHtmlPlugin, defaultConf: htmlPluginDefaultConf } = require('./AddHtmlPlugin');
const { createForkTsCheckerPlugin, defaultConf: forkTsCheckerDefaultConf } = require('./AddForkTsCheckPlugin');
const { createDefinePlugin, defaultConf: definePluginDefaultConf } = require('./AddDefinePlugin');
const { createPlugin: createCopyPlugin, defaultConf: copyPluginDefaultConf } = require('./AddCopyPlugin');
const { createPlugin: createCleanPlugin } = require('./AddCleanPlugin');
const {
    createPlugin: createCssExtractPlugin,
    defaultConf: cssExtractDefaultConf,
} = require('./AddMiniCssExtractPlugin');

/** @description webpack plugin creators, include plugins and others */
module.exports = {
    // eslint-webpack-plugin
    createEslintPlugin,
    eslintPluginDefaultConf,

    // html-webpack-plugin
    createHtmlPlugin,
    htmlPluginDefaultConf,

    // copy-plugin
    createCopyPlugin,
    copyPluginDefaultConf,

    // fork-ts-check-plugin
    createForkTsCheckerPlugin,
    forkTsCheckerDefaultConf,

    // define-plugin
    createDefinePlugin,
    definePluginDefaultConf,

    // mini-css-extract-plugin
    createCssExtractPlugin,
    cssExtractDefaultConf,

    // clean-webpack-plugin
    createCleanPlugin,
};
