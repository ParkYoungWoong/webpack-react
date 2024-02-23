import { resolve as pathResolve } from 'path';
import Config from 'webpack-chain';
import compose from 'compose-function';
import { loadStyles, loadJs } from './modules';
import { takeDotEnv } from './plugins';
// plugins
import { DefinePlugin } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { EsbuildPlugin } from 'esbuild-loader';
// types
import type { MinifyOptions } from 'terser';
import type { LoaderOptions as esbuildLoaderOptions } from 'esbuild-loader';

/**
 * @description Modify the relative path to the root path of the project using `path.resolve`
 * @param suffix the relative path relative to the root path of the project
 * @returns the real path
 */
const withBasePath = (suffix = '') => pathResolve(__dirname, `../../${suffix}`);

const { uglifyJsMinify } = TerserPlugin;

/** @description Self-defined options. */
export type SelfDefineOptions = Partial<{
    /** HTML Title */
    title: string;
    /** Language of the project */
    lang: string;
    /** for development conf */
    isDev: boolean;
    /** for production conf */
    isProd: boolean;
    /** for using dotenv plugin */
    isDotEnvUsed: boolean;
    /** for css compile */
    isCompiledWithSourceMap: (() => boolean) | boolean;
    /** for esbuild when in dev environment */
    isEsbuildInDev: boolean;
    /** for esbuild loader options */
    esbuildLoaderOptions: esbuildLoaderOptions;
    /** babel only compile, which is more important than `babelNotCompiles` */
    babelOnlyCompiles: (string | RegExp)[];
    /** babel not compile */
    babelNotCompiles: (string | RegExp)[];
}>;

/**
 * Generate a basic config
 * @param options config options
 * @returns basic webpack conf
 */
export const createBasicConfig = (options: SelfDefineOptions = {}): Config => {
    const {
        title = 'react-ts-webpack-starter',
        lang = 'en',
        isDev = true,
        isProd = false,
        isDotEnvUsed = false,
        isCompiledWithSourceMap = false,
        isEsbuildInDev = true,
        esbuildLoaderOptions = { target: 'es2020' },
        babelOnlyCompiles = [],
        babelNotCompiles = [/node_modules/],
    } = options || {};

    // basic options for the second parameter of the function `loadStyles`
    const loadStylesBasicOpts = {
        isDev,
        isCompiledWithSourceMap,
    };

    /** take conditional config and plugins */
    const takeConditionalConfig: (conf: Config) => Config = compose<Config>(
        (conf: Config) => takeDotEnv(conf, { isDotEnvUsed }),

        (conf: Config) =>
            loadStyles(conf, {
                ...loadStylesBasicOpts,
                styleType: 'sass',
            }),

        (conf: Config) =>
            loadStyles(conf, {
                ...loadStylesBasicOpts,
                styleType: 'scss',
            }),

        (conf: Config) =>
            loadStyles(conf, {
                ...loadStylesBasicOpts,
                styleType: 'css',
            }),

        (conf: Config) =>
            loadJs(conf, {
                isProd,
                isEsbuildInDev,
                esbuildLoaderOptions,
                onlyCompiles: babelOnlyCompiles,
                notCompiles: babelNotCompiles,
            })
    );

    return takeConditionalConfig(
        new Config()
            // set context
            .context(withBasePath())
            // set entry
            .entry('index')
            .add(withBasePath('src/main.tsx'))
            .end()
            // output
            .output.path(withBasePath('dist'))
            .hashFunction('xxhash64')
            .filename('js/[name].[contenthash].bundle.js')
            .chunkFilename('js/[name].[contenthash].js')
            // Set output.clean to replace CleanWebpackPlugin. See: https://webpack.js.org/configuration/output/#outputclean
            .set('clean', true)
            .end()
            // set alias
            .resolve.alias.set('@', withBasePath('src'))
            .set('#', withBasePath('types'))
            .end()
            .extensions.add('.js')
            .add('.jsx')
            .add('.ts')
            .add('.tsx')
            .add('.json')
            .add('.cjs')
            .add('.mjs')
            .end()
            .end()
            .module.rule('pics')
            // add pics
            .test(/\.(png|svg|jpe?g|gif)$/i)
            .set('type', 'asset/resource')
            .set('generator', { filename: 'static/[hash][ext][query]' })
            .parser({ dataUrlCondition: { maxSize: 10 * 1024 } })
            .end()
            .rule('fonts')
            .test(/\.(woff2?|eot|[ot]tf)$/i)
            .set('type', 'asset/resource')
            .end()
            .end()
            // set plugins
            .plugin('HtmlWebpackPlugin')
            .use(HtmlWebpackPlugin, [
                {
                    template: withBasePath('html/index.htm'),
                    templateParameters: {
                        lang,
                    },
                    inject: 'body',
                    favicon: withBasePath('html/favicon.ico'),
                    title,
                },
            ])
            .end()
            .plugin('DefinePlugin')
            .use(DefinePlugin, [
                {
                    isDev,
                    isProd,
                },
            ])
            .end()
            // split chunks
            .optimization.splitChunks({
                chunks: 'all',
                minSize: 15000,
            })
            .end()
            .plugin('ForkTsCheckerWebpackPlugin')
            .use(ForkTsCheckerWebpackPlugin, [
                {
                    devServer: false,
                },
            ])
            .end()
            // set in development mode
            .when(isDev, configure => {
                configure
                    .devtool('source-map')
                    .mode('development')
                    // set devServer
                    .devServer.compress(true)
                    .port(9222)
                    .hot(true)
                    .open(false)
                    .end()
                    .plugin('ESLintPlugin')
                    .use(ESLintPlugin, [
                        {
                            extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.mjs', '.cjs'],
                            fix: true,
                            threads: true,
                        },
                    ])
                    .end()
                    // check ts in dev environment
                    .plugin('ForkTsCheckerWebpackPlugin')
                    .tap(([originConf]) => [
                        {
                            ...originConf,
                            devServer: true,
                        },
                    ])
                    .end()
                    // config esbuild
                    .when(isEsbuildInDev, conf => {
                        conf.optimization.minimizer('EsbuildPlugin').use(EsbuildPlugin, [
                            {
                                target: esbuildLoaderOptions?.target || 'es2020',
                            },
                        ]);
                    });
            })
            // set in production mode
            .when(isProd, configure => {
                configure
                    .devtool('eval')
                    .mode('production')
                    .optimization.minimize(true)
                    .minimizer('TerserPlugin')
                    .use(TerserPlugin<MinifyOptions>, [
                        {
                            extractComments: true,
                            minify: uglifyJsMinify,
                            terserOptions: {
                                ecma: 5,
                                compress: {
                                    drop_console: true,
                                    drop_debugger: true,
                                },
                            },
                        },
                    ])
                    .end()
                    .minimizer('CssMinimizerPlugin')
                    .use(CssMinimizerPlugin)
                    .end()
                    .splitChunks({
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
                    })
                    .set('realContentHash', false)
                    // html webpack plugin
                    .end()
                    .plugin('HtmlWebpackPlugin')
                    .tap(([originConf]) => [{ ...originConf, minify: true }])
                    .end()
                    .plugin('MiniCssExtractPlugin')
                    .use(MiniCssExtractPlugin, [
                        {
                            filename: 'style/[name]-[contenthash].css',
                        },
                    ])
                    .end()
                    // check ts in prod environment
                    .plugin('ForkTsCheckerWebpackPlugin')
                    .tap(([originConf]) => [
                        {
                            ...originConf,
                            devServer: false,
                            typescript: {
                                diagnosticOptions: {
                                    semantic: true,
                                    syntactic: true,
                                },
                            },
                        },
                    ])
                    .end();
            })
    );
};
