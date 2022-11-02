import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { Logger, yaml } from '@samurais-app/command-lib';
import { Environment, Protocol } from '@samurais-app/lib';
import { GetPlugin, IConfig, IConfigurationDoc, IPlugin, IPluginClass, Plugin } from '@samurais-app/platform-core';
import { AbstractPlugin, PluginFactory } from 'src/lib/plugins';

export const DEFAULT_CONFIG: IConfigurationDoc = {
    host: '0.0.0.0',
    protocol: Protocol.HTTP,
    port: '3000',
    plugins: [{
        name: '@samurais-app/web-plugins',
        type: Plugin.WEB,
        version: '0.0.5'
    }, {
        name: '@samurais-app/auth-plugins',
        type: Plugin.AUTH,
        version: '0.0.5'
    }]
};


export class Configuration implements IConfig {
    private static instance: Configuration;
    constructor(private configPath: string = 'config') {
        if (Configuration.instance) return Configuration.instance;
        Configuration.instance = this;
        return Configuration.instance;
    }
    private doc: IConfigurationDoc = DEFAULT_CONFIG;
    private _env: Environment;

    async load() {
        const { plugins, ...data } = yaml.load(readFileSync(this.path, 'utf8'));
        const _plugins = await PluginFactory.init(plugins);
        this.doc = {
            plugins: _plugins,
            ...data
        };
    }

    init(env: Environment) {
        this.env = env;
        this.create();
    }

    get path(): string | undefined {
        const localPath = join(this.root, this.configPath, `${this.env}.config.yaml`);
        return localPath;
    }

    get protocol() {
        return this.doc.protocol;
    }

    get port() {
        return this.doc.port;
    }

    get root() {
        return process.cwd();
    }

    get env() {
        return this._env;
    }

    set env(value: Environment) {
        this._env = value;
    }

    get plugins(): IPlugin[] {
        return this.doc.plugins || [];
    }

    get host() {
        return this.doc.host;
    }

    getPlugin: GetPlugin = (p) => {
        const plugins = this.plugins as unknown as AbstractPlugin[];
        const _plugin = plugins.find((pl) => pl.getInstance().type === p);
        if (!_plugin) return undefined;
        return _plugin.getInstance();
    };

    create() {
        const configPath = join(this.root, this.configPath);
        if (!existsSync(configPath)) mkdirSync(configPath, { recursive: true });
        if (existsSync(this.path)) return;
        writeFileSync(this.path, yaml.dump({ ...this.doc, plugins: this.doc.plugins.map<IPlugin>((p) => ({ type: p.type, name: p.name, version: p.version, options: p.options })) }), 'utf-8');
        Logger.info('创建配置:%s', this.path);
        return this;
    }

    check() {
        if (!existsSync(this.path)) {
            Logger.error('工程配置文件缺失,请创建配置文件:\nsamuras-platform init');
        }
        return this;
    }

    // 更新本地配置
    update() {
        if (!this.path) {
            Logger.wran('工程配置文件缺失,请创建配置文件:\nsamuras config --init');
            return this;
        }
        writeFileSync(this.path, yaml.dump({ ...this.doc }), 'utf-8');
        return this;
    }
}