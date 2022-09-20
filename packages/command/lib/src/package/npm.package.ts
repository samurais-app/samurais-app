import { NpmRunner } from '../runners';
import { AbstractPackage } from './abstract.package';
import { Package, PackageCommands } from './package';


export class NpmPackage extends AbstractPackage {
    constructor() {
        super(new NpmRunner());
    }

    public get name() {
        return Package.NPM.toUpperCase();
    }

    get cli(): PackageCommands {
        return {
            install: 'install',
            add: 'install',
            update: 'update',
            remove: 'uninstall',
            saveFlag: '--save',
            saveDevFlag: '--save-dev',
            silentFlag: '--silent',
            force: '--force',
        };
    }
}