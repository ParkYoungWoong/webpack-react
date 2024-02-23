import { versions, release } from 'process';

/** the options */
type Opts = Partial<{
    /** @description the lowest version */
    lowestVersion: number;
    /** @description the highest version */
    highestVersion: number;
    /** @description is limited to LTS */
    isTakingLTS: boolean;
}>;

/** @description Check node.js version before running programme. */
export const checkNodejsVersion = (opts: Opts = {}) => {
    const { lowestVersion = 14, highestVersion, isTakingLTS = true } = opts || {};

    const [greatestVersion] = versions.node.split('.').map(v => +v);

    // Check the greatest version is equal to or more than the lowest version.
    if (lowestVersion && greatestVersion < lowestVersion) {
        throw new Error(`The Nodejs version should be >= ${lowestVersion}`);
    }

    // Check the greatest version is equal to or less than the highest version.
    if (highestVersion && greatestVersion > highestVersion) {
        throw new Error(`The Nodejs version should be <= ${highestVersion}`);
    }

    // Check whether is LTS version or not.
    const { lts } = release;
    if (isTakingLTS && (greatestVersion % 2 === 1 || !lts)) {
        throw new Error('Must use LTS version!');
    }

    console.log('The Nodejs version is valid!');
};
