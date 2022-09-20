import { YarnRunner } from '../runners';
import { AbstractPackage } from './abstract.package';
import { Package, PackageCommands } from './package';

export class YarnPackage extends AbstractPackage {
    constructor() {
        super(new YarnRunner());
    }

    public get name() {
        return Package.YARN.toUpperCase();
    }

    get cli(): PackageCommands {
        return {
            install: 'install',
            add: 'add',
            update: 'upgrade',
            remove: 'remove',
            saveFlag: '',
            saveDevFlag: '-D',
            silentFlag: '--silent',
        };
    }
}