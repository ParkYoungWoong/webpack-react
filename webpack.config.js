const { resolve: pathResolve } = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const { cloneDeep } = require('lodash');
const { webpackBaseConfig: baseConfig, webpackHooks, webpackCreator } = require('./confs');
const { loadersCreator, pluginsCreator } = webpackCreator;
const { createLoadStyleConf } = loadersCreator;
const {
    createEslintPlugin,
    createHtmlPlugin,
    createForkTsCheckerPlugin,
    createDefinePlugin,
    createCssExtractPlugin,
    createCleanPlugin,
} = pluginsCreator;
const { createAlias, createLoaders, createPlugins } = webpackHooks;

const { NODE_ENV = 'development' } = process.env;

// loader config function
const configLoaders = env => {
    const { prod } = env || {};

    const { configOneLoader, getConfigOfLoaders } = createLoaders();

    // configure production loader options
    if (prod && NODE_ENV === 'production') {
        // use mini-css-extract-plugin loader
        ['css', 'scss', 'sass'].forEach(styleType => {
            configOneLoader(
                styleType,
                createLoadStyleConf({
                    styleType,
                    isUseMiniCssExtract: true,
                })
            );
        });
    }

    return getConfigOfLoaders();
};

// config plugin function
const configPlugins = env => {
    const { dev, prod } = env || {};

    const { getPluginConfig, configPlugin } = createPlugins();

    // set define plugin
    configPlugin(
        'definePlugin',
        createDefinePlugin({
            isDev: Boolean(dev && NODE_ENV === 'development'),
            isProd: Boolean(prod && NODE_ENV === 'production'),
        })
    );

    // self-defined HtmlWebpackPlugin configuration
    const htmlPluginSelfConfiguration = {
        templateParameters: {
            lang: 'zh-cn',
        },
        title: 'React + TypeScript Webpack Project',
    };
    // reset HtmlWebpackPlugin configuration
    configPlugin('htmlPlugin', createHtmlPlugin(htmlPluginSelfConfiguration));

    if (dev) {
        // eslint plugin
        configPlugin('eslintPlugin', createEslintPlugin());

        // ts-checker plugin
        configPlugin('tsCheckerPlugin', createForkTsCheckerPlugin());
    }

    if (prod && NODE_ENV === 'production') {
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
module.exports = env => {
    // use env and argv
    const { dev, prod } = env || {};

    let conf = Object.assign(cloneDeep(baseConfig), {
        module: {
            rules: configLoaders(env),
        },
        plugins: configPlugins(env),
    });

    const { resolve: oldResolve } = conf;
    conf = Object.assign(conf, {
        resolve: {
            ...oldResolve,
            alias: createAlias({
                '#': pathResolve(__dirname, 'types'),
            }),
        },
    });

    if (dev) {
        conf = Object.assign(conf, {
            devtool: 'source-map',
        });
    }

    if (prod && NODE_ENV === 'production') {
        conf = Object.assign(
            conf,
            {
                devtool: 'nosources-source-map',
            },
            {
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
            }
        );
    }

    return conf;
};
