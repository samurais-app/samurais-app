import { Input } from 'src/commands';
import { RuntimeFactory } from 'src/lib/runtimes';
import { join } from 'path';
import { AbstractAction } from './abstract.action';
import { Application, Configuration } from 'src/lib/configuration';


export class StartAction extends AbstractAction {

    private async startApplication(appConfig: Application, config: Configuration) {
        appConfig.path = join(config.root, config.packages, appConfig.name);
        appConfig.version = require(join(appConfig.path, 'package.json')).version;
        appConfig.url = config.url;
        const type = RuntimeFactory.findAppType(appConfig.path);
        const app = RuntimeFactory.create(type);
        await app.registerApplication(appConfig);
        await appConfig.start();
        await appConfig.synchronization();
    }

    public async handle(inputs?: Input[], options?: Input[], extraFlags?: string[]): Promise<void> {
        const name = inputs.find((option) => option.name === 'name')!.value as string;
        const config = new Configuration();
        config.check();
        if (!config.has(name)) config.addApplication(name, { exposes: [], remotes: [] });
        const app = config.getApplication(name);
        await app.check();
        await this.startApplication(app, config);
    }
}