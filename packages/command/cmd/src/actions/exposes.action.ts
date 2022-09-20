import { Input } from 'src/commands';
import { extname, join } from 'path';
import { AbstractAction } from './abstract.action';
import { Logger } from '@samurais-app/command-lib';
import { Configuration } from 'src/lib/configuration/configuration';


export class ExposesAction extends AbstractAction {
    private getExposesApplication(config: Configuration, file: string) {
        const rootDir = process.cwd();
        const filePath = join(rootDir, file);
        const packageasPaths = config.projects.map((pa) => ({ name: pa, path: join(config.root, config.packages, pa) }));
        const packagePath = packageasPaths.find((p) => filePath.includes(p.path));
        const pathName = file.replace(extname(file as string), '').split('/').pop();
        if (packagePath) {
            return { name: packagePath.name, moduleName: pathName, modulePath: filePath.replace(`${packagePath.path}/`, '') };
        }
        return undefined;
    }

    public async handle(inputs?: Input[], options?: Input[], extraFlags?: string[]): Promise<void> {
        const config = new Configuration();
        config.check();

        const file = options.find((option) => option.name === 'file')!.value as string;
        const env = options.find((option) => option.name === 'env')!.value;
        const exposesFile = this.getExposesApplication(config, file);
        if (!exposesFile) Logger.error('非可导出项目');
        const { name, moduleName, modulePath } = exposesFile;
        if (!config.has(name)) {
            config.addApplication(name, { exposes: [], remotes: [] });
        }
        const application = config.getApplication(name);
        await application.check();
        application.url = config.url;
        application.addExposes(moduleName, modulePath);
        config.update();
        process.exit(0);
    }

}