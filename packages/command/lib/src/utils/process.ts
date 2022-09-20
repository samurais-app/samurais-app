import chalk from 'chalk';
import { execSync, spawn } from 'child_process';
import detect from 'detect-port-alt';
import opn from 'opn';
import { join } from 'path';
import inquirer from 'inquirer';
import { Logger } from './logger';

const OSX_CHROME = 'google chrome';

export function getPackageNameInDirectory(directory) {
    const packagePath = join(directory.trim(), 'package.json');

    try {
        return require(packagePath).name;
    } catch (e) {
        return null;
    }
}

export function isProcessAReactApp(processCommand) {
    return processCommand.includes('bin/samurais');
    //return /^node .*bin\/samurais\s?$/.test(processCommand);
}

export function getProcessCommand(processId, processDirectory) {
    let command = execSync(
        'ps -o command -p ' + processId + ' | sed -n 2p').toString();

    command = command.replace(/\n$/, '');
    if (isProcessAReactApp(command)) {
        const packageName = getPackageNameInDirectory(processDirectory);
        return packageName ? packageName : command;
    } else {
        return command;
    }
}

export function getProcessIdOnPort(port) {
    return execSync('lsof -i:' + port + ' -P -t -sTCP:LISTEN').toString()
        .split('\n')[0]
        .trim();
}


export function getProcessForPort(directory, port) {
    try {
        const processId = getProcessIdOnPort(port);
        const command = getProcessCommand(processId, directory);
        return (
            chalk.cyan(command) +
      chalk.grey(' (pid ' + processId + ')')
        );
    } catch (e) {
        return null;
    }
}

export function clearConsole() {
    process.stdout.write(
        process.platform === 'win32' ? '\x1B[2J\x1B[0f' : '\x1B[2J\x1B[3J\x1B[H'
    );
}

export function startBrowserProcess(browser, url) {
    const shouldTryOpenChromeWithAppleScript =
    process.platform === 'darwin' &&
    (typeof browser !== 'string' || browser === OSX_CHROME);

    if (shouldTryOpenChromeWithAppleScript) {
        try {
            execSync('ps cax | grep "Google Chrome"');
            execSync('osascript openChrome.applescript "' + encodeURI(url) + '"', {
                cwd: __dirname,
                stdio: 'ignore',
            });
            return true;
        } catch (err: any) {
            Logger.info(err.message);
        }
    }
    if (process.platform === 'darwin' && browser === 'open') {
        browser = undefined;
    }

    try {
        const options = { app: browser, wait: false };
        opn(url, options).catch(() => { Logger.error('启动异常'); }); // Prevent `unhandledRejection` error.
        return true;
    } catch (err) {
        return false;
    }
}

export function executeNodeScript(scriptPath, url) {
    const extraArgs = process.argv.slice(2);
    const child = spawn('node', [scriptPath, ...extraArgs, url], {
        stdio: 'inherit',
    });
    child.on('close', code => {
        if (code !== 0) {
            Logger.error(
                '指定%s为脚本的环境变量失败.\n',
                'BROWSER'
            );
            console.log(chalk.cyan(scriptPath) + ' -->' + code + '.\n');
            return;
        }
    });
    return true;
}

export function choosePort(directory, host, defaultPort) {
    const isInteractive = process.stdout.isTTY;
    return detect(defaultPort, host).then(
        port =>
            new Promise(resolve => {
                if (port === defaultPort) {
                    return resolve(port);
                }
                const message =
          process.platform !== 'win32' && defaultPort < 1024
              ? '在低于1024的端口上运行服务器需要Admin权限.'
              : `端口${defaultPort}已经运行`;

                if (isInteractive) {
                    clearConsole();
                    const existingProcess = getProcessForPort(directory, defaultPort);
                    const question = {
                        type: 'confirm',
                        name: 'shouldChangePort',
                        message:
              chalk.redBright(message +
                `${existingProcess ? `:${existingProcess}` : ''}`) + '\n\n您想要在另一个端口上运行应用程序吗?',
                        default: true,
                    };
                    inquirer.prompt(question as any).then(answer => {
                        if (answer.shouldChangePort) {
                            resolve(port);
                        } else {
                            resolve(null);
                        }
                    });
                } else {
                    console.log(chalk.red(message));
                    resolve(null);
                }
            }),
        err => {
            Logger.error(`无法打开${host}:${defaultPort}`);
        }
    );
}