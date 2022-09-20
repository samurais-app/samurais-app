import { Input } from 'src/commands';
import { Logger } from '@samurais-app/command-lib';
import { AbstractAction } from './abstract.action';
import { join } from 'path';
import { writeFileSync } from 'fs';
import { Application, Configuration } from 'src/lib/configuration';


export class ImportAction extends AbstractAction {
    private writeImport(config: Configuration, name: Application, importAppName: Application) {
        const appPath = join(config.root, config.packages, name.name);
        const remotesCode = importAppName.exposes.reduce((a, b) => {
            return a.concat([`declare module "${importAppName.name}/${b.name}" { const ${b.name}: any; export default ${b.name}; }`]);
        }, ['']).join('\n');
        writeFileSync(join(appPath, `${importAppName.name}.d.ts`), remotesCode);
    }
    public async handle(inputs?: Input[], options?: Input[], extraFlags?: string[]): Promise<void> {
        const name = inputs.find((inp) => inp.name === 'name')!.value as string;
        const env = options.find((inp) => inp.name === 'env')!.value as string;
        const configPath = options.find((inp) => inp.name === 'config')!.value as string;
        const importAppName = options.find((inp) => inp.name === 'application')!.value as string;
        const config = new Configuration();
        config.check();
        if (!config.has(name)) {
            config.addApplication(name, { exposes: [], remotes: [] });
        }
        const application = config.getApplication(name);
        await application.check();
        application.url = config.url;
        if (!config.has(importAppName)) {
            config.addApplication(importAppName, { exposes: [], remotes: [] });
        }
        const importApplication = config.getApplication(importAppName);
        await importApplication.check();
        if (!importApplication.exposes.length) Logger.error(`${importApplication.name}无导出模块`);
        application.appRemotes(importAppName);
        this.writeImport(config, application, importApplication);
        config.update();
        Logger.info('导入成功');
        process.exit(0);
    }

}