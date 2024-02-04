const TerserPlugin = require('terser-webpack-plugin');
const { cloneDeep } = require('lodash');
const { webpackBaseConfig: baseConfig, webpackHooks, webpackCreator } = require('./confs');
const { loadersCreator, pluginsCreator } = webpackCreator;
const { createLoadStyleConf } = loadersCreator;
const {
    createEslintPlugin,
    createHtmlPlugin,
    htmlPluginDefaultConf,
    createForkTsCheckerPlugin,
    createDefinePlugin,
    createCssExtractPlugin,
    createCleanPlugin,
} = pluginsCreator;
const { createLoaders, createPlugins } = webpackHooks;

// loader config function
const configLoaders = (env, argv) => {
    const { prod } = env || {};
    const { mode } = argv || {};

    const { configOneLoader, getConfigOfLoaders } = createLoaders();

    // configure production loader options
    if (prod && mode === 'production') {
        // use mini-css-extract-plugin loader
        const basicExtractConf = {
            styleType: 'css',
            isProd: true,
        };

        configOneLoader('css', createLoadStyleConf(basicExtractConf));
        configOneLoader(
            'scss',
            createLoadStyleConf({
                ...basicExtractConf,
                styleType: 'scss',
            })
        );
        configOneLoader(
            'sass',
            createLoadStyleConf({
                ...basicExtractConf,
                styleType: 'sass',
            })
        );
    }

    return getConfigOfLoaders();
};

// config plugin function
const configPlugins = (env, argv) => {
    const { dev, prod } = env || {};
    const { mode } = argv || {};

    const { getPluginConfig, configPlugin } = createPlugins();

    // set define plugin
    configPlugin(
        'definePlugin',
        createDefinePlugin({
            isDev: !!dev,
            isProd: !!prod,
        })
    );

    // self-defined HtmlWebpackPlugin configuration
    const htmlPluginSelfConfiguration = Object.assign(cloneDeep(htmlPluginDefaultConf), {
        templateParameters: {
            lang: 'zh-cn',
        },
        title: 'React + TypeScript Webpack Project',
    });
    // reset HtmlWebpackPlugin configuration
    configPlugin('htmlPlugin', createHtmlPlugin(htmlPluginSelfConfiguration));

    if (dev) {
        // eslint plugin
        configPlugin('eslintPlugin', createEslintPlugin());

        // ts-checker plugin
        configPlugin('tsCheckerPlugin', createForkTsCheckerPlugin());
    }

    if (prod && mode === 'production') {
        // html plugin in product
        configPlugin(
            'htmlPlugin',
            createHtmlPlugin({
                ...htmlPluginSelfConfiguration,
                minify: true,
            })
        );

        // css extract plugin
        configPlugin('cssExtractPlugin', createCssExtractPlugin());

        // clean-webpack-plugin
        configPlugin('cleanWebpackPlugin', createCleanPlugin());
    }

    return getPluginConfig();
};

/**
 * Exporting a Config Function. See:
 * https://webpack.js.org/configuration/configuration-types/#exporting-a-function
 */
module.exports = (env, argv) => {
    // use env and argv
    const { prod } = env || {};
    const { mode } = argv || {};

    let conf = Object.assign(cloneDeep(baseConfig), {
        module: {
            rules: configLoaders(env, argv),
        },
        plugins: configPlugins(env, argv),
    });

    if (prod && mode === 'production') {
        conf = Object.assign(conf, {
            optimization: {
                realContentHash: false,
                splitChunks: {
                    cacheGroups: {
                        defaultVendors: {
                            name: 'chunk-vendors',
                            test: /[\\/]node_modules[\\/]/,
                            priority: -10,
                            chunks: 'initial',
                        },
                        common: {
                            name: 'chunk-common',
                            minChunks: 2,
                            priority: -20,
                            chunks: 'initial',
                            reuseExistingChunk: true,
                        },
                    },
                },
                minimize: true,

                // add minimizer
                minimizer: [
                    new TerserPlugin({
                        parallel: true,
                        extractComments: false,
                        minify: TerserPlugin.uglifyJsMinify,
                        terserOptions: {
                            ecma: 5,
                            compress: {
                                drop_console: true,
                                drop_debugger: true,
                            },
                        },
                    }),
                ],
            },
        });
    }

    return conf;
};
