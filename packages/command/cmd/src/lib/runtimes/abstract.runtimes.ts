import HtmlPlugin from 'html-webpack-plugin';
import { choosePort, executeNodeScript, Logger, startBrowserProcess } from '@samurais-app/command-lib';
import { container } from 'webpack';
import os from 'os';
import { Cache, Config, Plugin, Rule } from '../interfaces';
import { LSOF_TABLE_TYPE, WebpackRunner } from '../runners';
import { RuntimeType } from './runtimes';
import { MESSAGE } from '../ui';
import ora from 'ora';
import { Application, Configuration } from '../configuration';
import { join } from 'path';

export abstract class AbstractRuntime {
    constructor(protected app: RuntimeType, protected webpack: WebpackRunner) { }
    private application: Application;
    protected config: Configuration;



    public registerApplication(app: Application) {
        app.start = this.start.bind(this, app);
        app.build = this.build.bind(this, app);
    }


    private Actions = Object.freeze({
        NONE: 0,
        BROWSER: 1,
        SCRIPT: 2,
    });

    private getIp() {
        const ips = Object.values(os.networkInterfaces()).flat();
        // a.filter((net) => {
        //     return net.family === 'IPv4' && net.address !== '127.0.0.1' && !net.internal;
        // });
        console.log(os.networkInterfaces());
    }

    protected abstract cache(): Cache;

    protected abstract rules(): Rule[];
    protected abstract plugins(): Plugin[];

    private withMode(config: Config) {
        config.mode = this.application.root.mode;
        return this;
    }

    private withOutput(config: Config) {
        const path = join(this.application.path, this.application.output);
        config.output = {
            filename: 'js/[contenthash:8].js',
            pathinfo: this.application.root.mode === 'development',
            path,
            chunkFilename: 'js/[contenthash:8].chunk.js',
            assetModuleFilename: 'media/[chunkhash:8][ext]',
        };
        return this;
    }

    private createWebpackConfig(): Config {
        const entry = join(this.application.path, this.application.entry);
        const template = this.application.root.template;
        return {
            entry: {
                main: entry
            },
            cache: false,
            infrastructureLogging: {
                level: 'none',
            },
            resolve: {
                extensions: ['.ts', '.tsx', '.js', '.vue'],
            },
            module: {
                rules: [
                    {
                        test: /\.tsx?$/,
                        loader: this.findLocalModule('babel-loader'),
                        exclude: /node_modules/,
                        options: {
                            presets: [this.findLocalModule('@babel/preset-react'), this.findLocalModule('@babel/preset-typescript')],
                        },
                    },
                    ...this.rules()
                ],
            },
            plugins: [
                new HtmlPlugin({
                    template,
                    hash: true,
                    minify: {
                        collapseWhitespace: true,
                        removeAttributeQuotes: true
                    }
                }),
                ...this.plugins(),
            ]
        };
    }

    private withModuleFederationPlugin(config: Config) {
        const filename = this.application.filename;
        const name = this.application.name;
        const remotes = this.application.withRemotes();
        const exposes = this.application.withExposes();
        config.plugins.push(new container.ModuleFederationPlugin({
            name,
            filename,
            remotes,
            exposes
        }));
        return this;
    }

    private createDevServerConfig(config: Config): Config {
        return {
            ...config,
            watch: true,
            watchOptions: {
                ignored: /node_modules/,
                aggregateTimeout: 300,
                poll: 1000,
            },
            devServer: {
                static: {
                    directory: join(this.application.path, this.application.output),
                },
                compress: true,
                hot: true,
                host: '0.0.0.0',
                port: 3001,
            },
        };
    }

    protected getModulePaths() {
        return module.paths;
    }

    protected findLocalModule(name: string): string {
        try {
            return require.resolve(
                name,
                { paths: this.getModulePaths() },
            );
        } catch {
            throw new Error('\'schematics\' binary path could not be found!');
        }
    }

    private getBrowserEnv() {
        const value = process.env.BROWSER;
        let action;
        if (!value) {
            // Default.
            action = this.Actions.BROWSER;
        } else if (value.toLowerCase().endsWith('.js')) {
            action = this.Actions.SCRIPT;
        } else if (value.toLowerCase() === 'none') {
            action = this.Actions.NONE;
        } else {
            action = this.Actions.BROWSER;
        }
        return { action, value };
    }

    private openBrowser(url) {
        const { action, value } = this.getBrowserEnv();
        switch (action) {
        case this.Actions.NONE:
            return false;
        case this.Actions.SCRIPT:
            return executeNodeScript(value, url);
        case this.Actions.BROWSER:
            return startBrowserProcess(value, url);
        default:
            return false;
        }
    }

    private async withRemotesPort() {
        const ids = await this.webpack.getNodeProcess(LSOF_TABLE_TYPE.IPV4);
        return this.webpack.getStatrNodeProcessAndPort(ids).then((data) => {
            data.forEach((item) => {
                const { name, port } = item;
                const app = this.application.root.getApplication(name);
                app.port = port;
            });
        });
    }

    private async build(application: Application) {
        this.application = application;
        const config = this.createWebpackConfig();
        this.withMode(config).withOutput(config).withModuleFederationPlugin(config);
        Logger.info('准备打包\n%s', `应用:${this.application.name}\n版本:${this.application.version}`);
        const spinner = ora({
            spinner: {
                interval: 120,
                frames: ['▹▹▹▹▹', '▸▹▹▹▹', '▹▸▹▹▹', '▹▹▸▹▹', '▹▹▹▸▹', '▹▹▹▹▸'],
            },
            text: MESSAGE.APPLICATION_BUILD(this.application.name),
        });
        spinner.start('开始构建');
        const status = await this.webpack.build(config);
        if (status) {
            spinner.succeed('构建完成');
        } else {
            spinner.fail();
            Logger.error('构建失败');
        }
    }

    private async start(application: Application) {
        this.application = application;
        const config = this.createDevServerConfig(this.createWebpackConfig());
        const port = await choosePort(this.application.name, config.devServer.host, config.devServer.port);
        this.application.port = port;
        config.devServer.port = port;
        this.withMode(config).withOutput(config).withModuleFederationPlugin(config);
        await this.withRemotesPort();
        const status = await this.webpack.start(config);
        if (status) {
            this.openBrowser(this.application.url);
            // 在应用启动后增加同步功能
            this.application.synchronization = this.synchronization.bind(this, application);
        }
    }

    private async synchronization(application: Application) {
        // TODO:本地应用同步
        console.log(this.getIp());
    }
}