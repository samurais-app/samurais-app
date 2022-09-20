import { Package, PackageFactory } from '@samurais-app/command-lib';
import { AbstractStoragePlugin } from '@samurais-app/platform-core';
import { AbstractPlugin } from './abstract.plugin';


export class StorePlugin extends AbstractPlugin {
    constructor(name: string) { super(name, PackageFactory.create(Package.NPM)); }

    public async load<O = any>(_version: string, options: O): Promise<StorePlugin> {
        const plugin = await super.load(_version, options);
        const _instance = plugin.getInstance() as AbstractStoragePlugin;
        if (!_instance || typeof _instance.init !== 'function') return plugin;
        await _instance.init();
        return plugin;
    }

}