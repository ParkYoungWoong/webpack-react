const { resolve: pathResolve } = require('path');

const baseConfig = Object.freeze({
    '@': pathResolve(__dirname, '../../../../src'),
});

/**
 * create entry config
 * @param {Record<string, unknown>} yourConfig add your config of entry
 * @returns an entry config
 */
const createAlias = (yourConfig = {}) => Object.assign(Object.create(null), baseConfig, yourConfig);

module.exports = createAlias;
