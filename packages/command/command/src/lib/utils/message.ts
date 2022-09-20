import chalk from 'chalk';
import { EMOJIS } from '@samurais-app/command-lib';

export const MESSAGE = {
    EMPTY_PLUGIN: (name: string) => `${EMOJIS.WINE} ${chalk.red(`缺少插件:${name}`)}`,
    EMPTY_MAIN: `${EMOJIS.WINE} 缺少导出文件`,
    EMPTY_PACKAGE_JSON: '缺少package.json',
    EMPTY_PACKAGE: (name: string) => `缺少包:${name}`
};