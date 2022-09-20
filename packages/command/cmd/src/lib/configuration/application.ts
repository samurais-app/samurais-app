import inquirer from 'inquirer';
import { RuntimeType } from 'src/lib/runtimes';
import { generateInput } from '@samurais-app/command-lib';
import { Protocol } from '@samurais-app/lib';
import { Configuration } from './configuration';

export interface IExposes {
    name: string;
    path: string;
}

export interface IApplication {
    type: RuntimeType
    filename: string;
    name: string;
    entry?: string;
    output?: string;
    version?: string;
    protocol?: Protocol;
    path: string;
    remotes: string[];
    exposes: IExposes[];
    port?: string;
    url?: string;
}


export class Application {
    constructor(private config: IApplication) { }
    private _root: Configuration;

    get root() {
        return this._root;
    }

    set root(value: Configuration) {
        this._root = value;
    }

    get data() {
        return this.config;
    }

    get name() {
        return this.config.name;
    }
    set name(value: string) {
        this.config.name = value;
    }

    get path() {
        return this.config.path;
    }
    set path(value: string) {
        this.config.path = value;
    }

    get remotes() {
        return this.config.remotes || [];
    }
    set remotes(value: string[]) {
        this.config.remotes = value;
    }

    get exposes() {
        return this.config.exposes || [];
    }

    set exposes(value: IExposes[]) {
        this.config.exposes = value;
    }

    get port() {
        return this.config.port;
    }
    set port(value: string) {
        this.config.port = value;
    }

    get url() {
        const _url = this.config.url || this._root.url;
        let temp = [this.protocol, '://', _url];
        if (this.port) temp = temp.concat([':', this.port]);
        return temp.join('');
    }
    set url(value: string) {
        this.config.url = value;
    }

    get entry() {
        return this.config.entry || 'src/index';
    }

    set entry(value: string) {
        this.config.entry = value;
    }

    get output() {
        return this.config.output || 'dist';
    }

    set output(value: string) {
        this.config.output = value;
    }

    get filename() {
        return 'main.js';
    }

    get type() {
        return this.config.type;
    }

    set type(value: RuntimeType) {
        this.config.type = value;
    }

    get version() {
        return this.config.version;
    }

    set version(value: string) {
        this.config.version = value;
    }

    get protocol() {
        return this.config.protocol || this._root.protocol;
    }

    set protocol(value: Protocol) {
        this.config.protocol = value;
    }

    hasExposes(moduleName: string) {
        const expos = this.exposes.map((ex) => Object.keys(ex)).flat();
        return expos.includes(moduleName);
    }

    addExposes(moduleName, modulePath) {
        this.exposes = this.exposes.filter((ex) => !ex.name !== moduleName);
        this.exposes = this.exposes.concat([{ name: moduleName, path: modulePath }]);
    }

    removeExposes(app: string) {
        this.exposes = this.exposes.filter((re) => re.name !== app);
    }

    hasRemotes(app: string) {
        return this.remotes.includes(app);
    }

    appRemotes(app: string) {
        if (this.hasRemotes(app)) return;
        this.remotes = this.remotes.concat([app]);
    }

    removeRemotes(app: string) {
        this.remotes = this.remotes.filter((re) => re !== app);
    }

    withRemotes(): Record<string, string> {
        return this.remotes.reduce((a, b) => {
            const app = this._root.getApplication(b);
            a[`${b}`] = `${b}@${app.url}/${this.filename}`;
            return a;
        }, {});
    }

    withExposes() {
        return this.exposes.reduce((a, b) => {
            a[`./${b.name}`] = `./${this._root.packages}/${this.name}/${b.path}`;
            return a;
        }, {});
    }

    update(data: Partial<IApplication>) {
        this.config = { ...this.config, ...data };
    }

    async check() {
        const question = inquirer.createPromptModule();
        if (!this.entry) {
            await question([generateInput('entry', '请输入入口地址')('src/index')]).then(({ entry }) => { this.entry = entry; });
        }
        if (!this.output) {
            await question([generateInput('output', '请输入入口地址')('dist')]).then(({ output }) => { this.output = output; });
        }
    }

    async start() { return; }
    async build() { return; }

    async synchronization() { return; }
}