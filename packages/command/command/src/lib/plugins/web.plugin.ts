import { Logger, Package, PackageFactory } from '@samurais-app/command-lib';
import { IWebPluginOptions } from '@samurais-app/platform-core';
import { MESSAGE } from '../utils';
import { AbstractPlugin } from './abstract.plugin';

export class WebPlugin extends AbstractPlugin {
    constructor(name: string) { super(name, PackageFactory.create(Package.NPM)); }

    private async loadView(options: IWebPluginOptions) {
        const { component, version   } = options;
        await this.packages.import(component, version);
        return this.packages.dir(component);
    }

    public async load(_version: string, options: IWebPluginOptions): Promise<AbstractPlugin> {
        const base = await this.loadView(options);
        return super.load(_version, {...options, base});
    }
}