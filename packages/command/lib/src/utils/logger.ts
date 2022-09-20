import colors from 'chalk';
import { ERROR_PREFIX, INFO_PREFIX, WRAN_PREFIX } from '../ui';

export class Logger {
    static error(message: string, ...args: any[]) {
        console.log(`\n${ERROR_PREFIX} >>> ${colors.redBright(message)}`, ...args);
        process.exit(1);
    }
    static info(message: string, ...args: any[]) {
        console.log(`\n${INFO_PREFIX} >>> ${colors.green(message)}`, ...args);
    }
    static wran(message: string, ...args: any[]) {
        console.log(`\n${WRAN_PREFIX} >>> ${colors.yellow(message)}`, ...args);
    }
}