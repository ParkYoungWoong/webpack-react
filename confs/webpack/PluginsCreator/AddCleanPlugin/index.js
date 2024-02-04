const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// use clean-webpack-plugin
const createPlugin = (conf = null) => (conf ? new CleanWebpackPlugin(conf) : new CleanWebpackPlugin());

module.exports = {
    createPlugin,
};
