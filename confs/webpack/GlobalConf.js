const deepFreeze = require('deep-freeze-strict');

/** @description add config here */
module.exports = deepFreeze({
    extensions: ['.cjs', '.mjs', '.js', '.cts', '.mts', '.ts', '.jsx', '.tsx', '.json'],
});
