import { Input } from 'src/commands';
import { join } from 'path';
import { RuntimeFactory } from '../lib/runtimes';
import { AbstractAction } from './abstract.action';
import { Application, Configuration } from 'src/lib/configuration';

export class BuildAction extends AbstractAction {

    private async buildApplication(appConfig: Application, config: Configuration) {
        await appConfig.check();
        appConfig.path = join(config.root, config.packages, appConfig.name);
        appConfig.version = require(join(appConfig.path, 'package.json')).version;
        appConfig.url = config.url;
        const type = RuntimeFactory.findAppType(appConfig.path);
        const app = RuntimeFactory.create(type);
        app.registerApplication(appConfig);
        appConfig.build();
    }

    public async handle(inputs?: Input[], options?: Input[], extraFlags?: string[]): Promise<void> {
        const name = inputs.find((option) => option.name === 'name')!.value as string;
        const config = new Configuration();
        if (name && config.has(name)) {
            const appConfig = config.getApplication(name);
            await appConfig.check();
            await this.buildApplication(appConfig, config);
        } else {
            await Promise.allSettled(config.projects.map((dir) => {
                if (!config.has(dir)) config.addApplication(dir, { remotes: [], exposes: [] });
                const appConfig = config.getApplication(dir);
                return appConfig.check().then(() => this.buildApplication(appConfig, config));
            }));
        }
        config.update();
        process.exit(0);
    }
}