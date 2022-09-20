import { AbstractPackage, Logger } from '@samurais-app/command-lib';
import { Plugin, PluginType } from '@samurais-app/platform-core';
import { MESSAGE } from '../utils';


export abstract class AbstractPlugin {
    constructor(protected plugin: string, protected packages: AbstractPackage) { }

    private instance: PluginType<Plugin>;

    public getInstance<P extends Plugin>(): PluginType<P> {
        if (!this.instance) return undefined;
        return this.instance as PluginType<P>;
    }

    public async load(_version: string, options: any): Promise<AbstractPlugin> {
        const _options = { ...options, base: options.base || this.packages.dir(this.plugin) };
        const Instance = await this.packages.import(this.plugin, _version);
        if (typeof Instance !== 'function') return this;
        this.instance = new Instance(this.plugin, _version, _options);
        if (!this.instance.check(_options)) return this;
        return this;
    }
}