import { PnpmRunner } from '../runners';
import { AbstractPackage } from './abstract.package';
import { Package, PackageCommands } from './package';

export class PnpmPackage extends AbstractPackage {
    constructor() {
        super(new PnpmRunner());
    }

    public get name() {
        return Package.PNPM.toUpperCase();
    }

    // As of PNPM v5.3, all commands are shared with NPM v6.14.5. See: https://pnpm.js.org/en/pnpm-vs-npm
    get cli(): PackageCommands {
        return {
            install: 'install',
            add: 'install',
            update: 'update',
            remove: 'uninstall',
            saveFlag: '--save',
            saveDevFlag: '--save-dev',
            silentFlag: '--reporter=silent',
        };
    }
}