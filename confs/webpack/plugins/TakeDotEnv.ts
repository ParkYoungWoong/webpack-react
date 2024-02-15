import Config from 'webpack-chain';
import DotEnv from 'dotenv-webpack';
import { resolve as pathResolve } from 'path';

/** @description use dotenv plugin as condition */
export const takeDotEnv = (
    confInstance: Config,
    opts: Partial<{
        isDotEnvUsed: boolean;
    }> = {}
) => {
    const { isDotEnvUsed = false } = opts || {};

    if (isDotEnvUsed) {
        return confInstance
            .plugin('DotEnv')
            .use(DotEnv, [{ path: pathResolve(__dirname, '../../../.env') }])
            .end();
    }

    return confInstance;
};
