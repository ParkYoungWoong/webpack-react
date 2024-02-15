import { versions, release } from 'process';

/** @description Check node.js version before running programme. */
export const checkNodejsVersion = () => {
    const [greatestVersion] = versions.node.split('.').map(v => +v);

    // Check the greatest version is equal to or more than 14.
    if (greatestVersion < 14) {
        throw new Error('The Nodejs version should be >= 14');
    }

    // Check whether is LTS version or not.
    const { lts } = release;
    if (greatestVersion % 2 === 1 || !lts) {
        throw new Error('Must use LTS version!');
    }

    console.log('The Nodejs version is valid!');
};
