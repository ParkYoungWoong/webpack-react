import { createBasicConfig, checkNodejsVersion } from './confs';
import type { Configuration } from 'webpack';
import type { SelfDefineOptions } from './confs';

/**
 * @description Export a Config Function.
 * See: https://webpack.js.org/configuration/configuration-types/#exporting-a-function
 * @param  environments environments, like dev, prod ...
 * @returns a webpack config
 */
const webpackConfigCallback = (environments: Record<string, unknown>): Configuration => {
    checkNodejsVersion();

    // use env and process.env
    const { dev, prod } = environments;
    const { NODE_ENV = 'development' } = process.env;

    // options for basicConfig
    const basicConfigOptions: SelfDefineOptions = {
        title: 'react-ts-webpack-starter',
        lang: 'zh-CN',
        isDev: !!dev && NODE_ENV === 'development',
        isProd: !!prod && NODE_ENV === 'production',
    };

    return createBasicConfig(basicConfigOptions).toConfig();
};

export default webpackConfigCallback;
