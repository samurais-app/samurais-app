import { MESSAGE } from 'src/ui/message';
import ora from 'ora';
import { extname, join } from 'path';
import fs from 'fs';
import { dirname } from 'path';
import { AbstractRunner } from '../runners';
import { PackageCommands } from './package';
import { Logger } from '../utils';

export abstract class AbstractPackage {
    constructor(protected runner: AbstractRunner) { }

    // 判断包是否是加载本地文件的;
    private isLocal(name: string) {
        return name.startsWith('.');
    }

    private isFile(name: string) {
        return !!extname(name);
    }

    private load(name: string) {
        try {
            const _path = this.main(name);
            if (!_path) return undefined;
            if (!fs.existsSync(_path)) return undefined;
            const mod = require(_path);
            return mod.default || mod;
        } catch (error) {
            return undefined;
        }
    }

    public packageJsonPath(name) {
        try {
            const packageJson = require.resolve(
                `${name}/package.json`,
                { paths: module.paths },
            );
            return !fs.existsSync(packageJson) ? '' : packageJson;
        } catch {
            return '';
        }
    }

    public packageJsonData(path: string) {
        return require(path);
    }

    public dir(name: string){
        const pkgJsonPath = this.packageJsonPath(name);
        if(!pkgJsonPath || !fs.existsSync(pkgJsonPath)) return undefined;
        return dirname(pkgJsonPath);
    }

    public main(name: string) {
        const pkgJsonPath = this.packageJsonPath(name);
        if(!pkgJsonPath || !fs.existsSync(pkgJsonPath)) return undefined;
        const { main, lib } = this.packageJsonData(pkgJsonPath);
        if(!main && !lib) return undefined;
        const mainPath = join(this.dir(name), main || lib);
        if(this.isFile(mainPath)) return mainPath;
        return undefined;
    }

    public current(name: string) {
        const pkgJsonPath = this.packageJsonPath(name);
        if(!pkgJsonPath || !fs.existsSync(pkgJsonPath)) return undefined;
        const { version } = this.packageJsonData(pkgJsonPath);
        return version;
    }

    public async import(name: string, version?: string) {
        if (this.isLocal(name)) return this.load(name);
        const _name = [name, version].filter(Boolean).join('@');
        const pkgJsonPath = this.packageJsonPath(name);
        if (!pkgJsonPath) {
            Logger.info(MESSAGE.EMPTY_PACKAGE(name));
            await this.install(process.cwd(), _name);
            return this.load(name);
        }
        const _version = this.current(name);
        if(version && _version != version) {
            Logger.info(MESSAGE.EMPTY_PACKAGE(name));
            await this.install(process.cwd(), _name);
        }
        return this.load(name);
    }



    public async install(cwd: string, name?: string) {
        const spinner = ora({
            spinner: {
                interval: 120,
                frames: ['▹▹▹▹▹', '▸▹▹▹▹', '▹▸▹▹▹', '▹▹▸▹▹', '▹▹▹▸▹', '▹▹▹▹▸'],
            },
            text: MESSAGE.PACKAGE_MANAGER_INSTALLATION_IN_PROGRESS,
        });
        spinner.start();
        try {
            const commandArgs = `${this.cli.install} ${name ? name : ''} ${this.cli.silentFlag} ${this.cli.force}`;
            const collect = true;
            await this.runner.run(
                commandArgs,
                collect,
                cwd,
            );
            spinner.succeed(MESSAGE.PACKAGE_MANAGER_INSTALLATION_SCCUESS(name));
        } catch (error: any) {
            spinner.fail(MESSAGE.PACKAGE_MANAGER_INSTALLATION_ERROR);
            if (error && error.message) {
                Logger.error(error.message);
            }
        }
    }

    public abstract get name(): string;

    public abstract get cli(): PackageCommands;
}