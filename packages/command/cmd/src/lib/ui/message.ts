import chalk from 'chalk';
import { EMOJIS } from '@samurais-app/command-lib';

export const MESSAGE = {
    PROJECT_INITIAL_START: `${EMOJIS.ROCKET} 开始初始化你的工程...`,
    APPLICATION_INITIAL_START: `${EMOJIS.ROCKET} 开始初始化你的项目...`,
    GIT_INITIALIZATION_ERROR: `${EMOJIS.CRYING} Git库没有初始化`,
    APPLICATION_BUILD: (name: string) => `${EMOJIS.ROCKET} ${chalk.green(`${name} 打包中......`)} `,
    DRY_RUN_MODE: '尝试运行安装依赖...',
    PACKAGE_MANAGER_QUESTION: `${EMOJIS.HEART} 你想使用那种包管理器?`,
};