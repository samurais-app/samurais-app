import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import home from 'home';
import { join } from 'path';
import { Logger, yaml } from '@samurais-app/command-lib';
import { Application, IApplication } from './application';
import { Environment, Protocol } from '@samurais-app/lib';

export interface IConfigurationDoc {
    packages: string;
    url: string;
    protocol: Protocol,
    applications: Application[]
}

export const DEFAULT_CONFIG: IConfigurationDoc = {
    packages: 'packages',
    url: 'localhost',
    protocol: Protocol.HTTP,
    applications: []
};


export class Configuration {
    private static instance: Configuration;
    constructor() {
        if (Configuration.instance) return Configuration.instance;
        Configuration.instance = this;
        return Configuration.instance;
    }
    private doc: IConfigurationDoc = DEFAULT_CONFIG;
    private _name: string;
    private _env: Environment;

    load(data: IConfigurationDoc) {
        this.doc = { ...this.doc, ...data };
    }

    get path(): string | undefined {
        let packageJson;
        if (existsSync(join(process.cwd(), 'package.json'))) {
            packageJson = require(join(process.cwd(), 'package.json'));
        }
        const localPath = join(process.cwd(), 'config.yaml');
        const homePath = join(home(), `.samuras/${packageJson ? packageJson.name : this._name}.yaml`);
        if (existsSync(localPath)) return localPath;
        if (existsSync(homePath)) return homePath;
        return undefined;
    }

    get protocol() {
        return this.doc.protocol;
    }

    get root() {
        return process.cwd();
    }

    get name() {
        if (existsSync(join(process.cwd(), 'package.json'))) return require(join(process.cwd(), 'package.json')).name;
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get env() {
        return this._env;
    }

    set env(value: Environment) {
        this._env = value;
    }

    get mode() {
        if (this._env !== Environment.development) return Environment.production;
        return Environment.development;
    }

    get url() {
        return this.doc.url;
    }

    get projects() {
        return readdirSync(join(this.root, this.packages));
    }

    get packages() {
        return this.doc.packages;
    }

    get applications() {
        return this.doc.applications || [];
    }

    get template() {
        return join(__dirname, '../../..', 'templates/h5.html');
    }

    create(path?: string) {
        const homePath = join(home(), '.samuras');
        if (!existsSync(homePath)) { mkdirSync(homePath, { recursive: true }); }
        const homeConfigPath = join(homePath, `${this.name}.yaml`);
        const _path = path || homeConfigPath;
        writeFileSync(_path, yaml.dump(this.doc), 'utf-8');
        Logger.info('创建配置:%s', _path);
        return this;
    }

    check() {
        if (!this.path) {
            Logger.error('工程配置文件缺失,请创建配置文件:\nsamuras config --init');
        }
        try {
            const { applications, ...data } = yaml.load(readFileSync(this.path, 'utf8'));
            this.load({
                ...data, applications: (applications || []).map((app) => {
                    const _app = new Application(app);
                    _app.root = this;
                    return _app;
                })
            });
        } catch (error) {
            Logger.error('请检查配置文件格式');
        }
        return this;
    }

    has(name: string) {
        const keys = this.applications.map((app) => app.name);
        return keys.includes(name);
    }

    getApplication(name: string) {
        if (!this.has(name)) return;
        return this.doc.applications.find((app) => app.name === name);
    }
    addApplication(name: string, data: Partial<IApplication>) {
        if (this.has(name)) return;
        const app = new Application({ ...data, name } as IApplication);
        app.root = this;
        this.doc.applications.push(app);
    }

    // 更新本地配置
    update() {
        if (!this.path) {
            Logger.error('工程配置文件缺失,请创建配置文件:\nsamuras config --init');
        }
        const applications = (this.doc.applications || []).reduce((a, app) => {
            const { type, filename, url, port, path, ...opt } = app.data;
            return a.concat([opt]);
        }, []);
        writeFileSync(this.path, yaml.dump({ ...this.doc, applications }), 'utf-8');
        return this;
    }

    // 进行本地配置与远程配置同步
    synchronization() { return undefined; }
}