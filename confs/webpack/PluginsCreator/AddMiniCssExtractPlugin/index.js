const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const deepFreeze = require('deep-freeze-strict');

// default configuration
const defaultConf = deepFreeze({
    filename: '[name]-[contenthash].css',
});

// use mini-css-extract-plugin
const createPlugin = (conf = {}) =>
    new MiniCssExtractPlugin({
        ...defaultConf,
        ...conf,
    });

module.exports = {
    createPlugin,
    defaultConf,
};
