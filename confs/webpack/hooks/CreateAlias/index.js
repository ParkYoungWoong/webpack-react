const { resolve: pathResolve } = require('path');

const baseConfig = Object.freeze({
    '@': pathResolve(__dirname, '../../../../src'),
});

/**
 * create alias config
 * @param {Record<string, unknown>} yourConfig add your config of alias
 * @returns an alias config
 */
const createAlias = (yourConfig = {}) => Object.assign(Object.create(null), baseConfig, yourConfig);

module.exports = createAlias;
