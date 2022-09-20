import { Logger } from '@samurais-app/command-lib';
import { IPlugin, IPluginClass, Plugin } from '@samurais-app/platform-core';
import { AbstractPlugin } from './abstract.plugin';
import { AuthPlugin } from './auth.plugin';
import { StorePlugin } from './store.plugin';
import { WebPlugin } from './web.plugin';


export class PluginFactory {
    public static create(type: Plugin, name: string): AbstractPlugin {
        switch (type) {
        case Plugin.WEB:
            return new WebPlugin(name);
            break;
        case Plugin.AUTH:
            return new AuthPlugin(name);
            break;
        case Plugin.STORAGE:
            return new StorePlugin(name);
        default:
            return undefined;
            break;
        }
    }

    public static init(plugins: IPlugin[] = []): Promise<AbstractPlugin[]> {
        if (!plugins || !plugins.length) return Promise.resolve([]);
        return Promise.all(plugins.map((p) => {
            const plugin = PluginFactory.create(p.type, p.name);
            if (!plugin || typeof plugin.load !== 'function') return undefined;
            return plugin.load(p.version, p.options).catch((e) => {
                if (e && e.message) Logger.wran(e.message);
                return undefined;
            });
        })).then((plugin) => plugin.filter(Boolean)).catch(() => []);
    }
}