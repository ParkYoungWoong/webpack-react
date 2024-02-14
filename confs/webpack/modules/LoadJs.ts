import Config from 'webpack-chain';

type LoadJsOptions = Partial<{
    isProd: boolean;
}>;

/** @description add thread loader when isProd */
export const loadJs = (confInstance: Config, opts: LoadJsOptions = {}) => {
    const { isProd } = opts || {};

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
