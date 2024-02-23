import Config from 'webpack-chain';
import type { LoaderOptions as EsbuildLoaderOpts } from 'esbuild-loader';

type LoadJsOptions = Partial<{
    isProd: boolean;
    isEsbuildInDev: boolean;
    esbuildLoaderOptions: EsbuildLoaderOpts;
}>;

/** @description add thread loader when isProd */
export const loadJs = (confInstance: Config, opts: LoadJsOptions = {}) => {
    const { isProd, isEsbuildInDev = true, esbuildLoaderOptions = {} } = opts || {};

    // basic config of ts-loader
    const tsLoaderBasicConf = {
        transpileOnly: true,
        happyPackMode: false,
    };

    if (isProd) {
        return confInstance.module
            .rule('js')
            .test(/\.[jt]sx?$/i)
            .use('thread-loader')
            .loader('thread-loader')
            .end()
            .use('babel')
            .loader('babel-loader')
            .options({ babelrc: true })
            .end()
            .exclude.add(/node_modules/)
            .end()
            .use('ts-loader')
            .loader('ts-loader')
            .options({
                ...tsLoaderBasicConf,
                happyPackMode: true,
            })
            .end()
            .end()
            .end();
    }

    if (isEsbuildInDev) {
        return confInstance.module
            .rule('esbuild')
            .test(/\.[jt]sx?$/i)
            .use('esbuild-loader')
            .loader('esbuild-loader')
            .options({ target: 'es2020', ...esbuildLoaderOptions })
            .end()
            .end()
            .end();
    }

    return confInstance.module
        .rule('js')
        .test(/\.[jt]sx?$/i)
        .use('babel')
        .loader('babel-loader')
        .options({ babelrc: true })
        .end()
        .exclude.add(/node_modules/)
        .end()
        .use('ts-loader')
        .loader('ts-loader')
        .options(tsLoaderBasicConf)
        .end()
        .end()
        .end();
};
