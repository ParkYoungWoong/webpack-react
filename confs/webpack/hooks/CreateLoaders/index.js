const deepFreeze = require('deep-freeze-strict');
const { cloneDeep } = require('lodash');
const { createLoadStyleConf } = require('../../LoadersCreator');

// base config for React
const baseLoaderRules = deepFreeze({
    jsx: {
        test: /\.[jt]sx?$/i,
        exclude: /node_modules/,
        use: [
            {
                loader: 'babel-loader',
            },
        ],
    },
    // add typescript
    ts: {
        test: /\.tsx?$/,
        exclude: /node_modules/, // 제외할 경로
        use: [
            {
                loader: 'babel-loader',
            },
            {
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    happyPackMode: false,
                },
            },
        ],
    },
    css: createLoadStyleConf(),
    scss: createLoadStyleConf({
        styleType: 'scss',
    }),
    sass: createLoadStyleConf({
        styleType: 'sass',
    }),
    pics: {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: 'asset/resource',
        parser: {
            dataUrlCondition: {
                maxSize: 10 * 1024,
            },
        },
    },
    fonts: {
        test: /\.(woff2?|eot|[ot]tf)$/i,
        type: 'asset/resource',
    },
});

/**
 * @description A hook to create loader config
 * @param {Record<string, unknown>} yourConfig Your loader conf
 * @returns three functions to create loader conf
 */
const createLoaders = (yourConfig = {}) => {
    let res = Object.assign(Object.create(null), cloneDeep(baseLoaderRules), yourConfig);

    /** @description get all loaders having been added */
    const getAllLoadersByName = () => Object.keys(res);

    /** @description use this function to get the configuration of the loader given name */
    const getOneLoaderConfig = loaderName => {
        if (getAllLoadersByName().includes(loaderName)) {
            return Object.freeze(Object.assign(Object.create(null), res[loaderName]));
        }

        return null;
    };

    /** @description get all loaders having been added by key-value */
    const getAllLoaderConfig = () => Object.freeze(Object.assign(Object.create(null), res));

    /** @description use this function to config a loader or add a loader */
    const configOneLoader = (key, opt) => {
        res = Object.assign(res, {
            [key]: opt,
        });
    };

    /** @description get the result of loader config */
    /**
     * @description Get the result of loader config
     * @param {'styl' | 'stylus'} uniqueStylus If you config 'styl' and 'stylus' at the same time, you should give the one you want to preserve. The default value is 'styl'.
     */
    function getConfigOfLoaders(uniqueStylus = 'styl') {
        const currentKeys = new Set(Object.keys(res));

        // unique styl and stylus
        if (currentKeys.has('styl') && currentKeys.has('stylus') && uniqueStylus) {
            const deletedOne = uniqueStylus === 'styl' ? 'stylus' : 'styl';
            currentKeys.delete(deletedOne);
            return [...currentKeys].map(currentKey => res[currentKey]);
        }

        return Object.values(res);
    }

    return {
        getAllLoadersByName,
        getOneLoaderConfig,
        getAllLoaderConfig,
        configOneLoader,
        getConfigOfLoaders,
    };
};

module.exports = createLoaders;
