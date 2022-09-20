import chalk from 'chalk';
import { EMOJIS } from './icon';

export const MESSAGE = {
    PACKAGE_MANAGER_INSTALLATION_IN_PROGRESS: `${EMOJIS.COFFEE} 开始安装工程依赖...`,
    PACKAGE_MANAGER_INSTALLATION_SCCUESS: (name?: string) => `${EMOJIS.HEART_EYES} ${name ? name : '依赖'}安装成功`,
    PACKAGE_MANAGER_INSTALLATION_ERROR: `${EMOJIS.CRYING} 依赖安装失败`,
    EMPTY_PACKAGE: (name: string) => `缺少包:${name}`
};