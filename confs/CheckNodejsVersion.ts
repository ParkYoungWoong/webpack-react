import { versions } from 'process';

/** @description Check node.js version before running programme. */
export const checkNodejsVersion = () => {
    const { node: nodeV } = versions;
    const [greatestVersion] = nodeV.split('.').map(v => +v);

    if (greatestVersion < 14) {
        throw new Error('The Nodejs version should be >= 14');
    }

    if (greatestVersion % 2 === 1) {
        throw new Error('Must use LTS version!');
    }

    console.log('The Nodejs version is valid!');
};
