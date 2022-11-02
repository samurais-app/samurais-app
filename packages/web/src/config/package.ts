import info from '../../package.json';

export default {
    env: process.env.env,
    name: info.name,
    version: info.version
};