import { Command } from 'commander';
import { Configuration } from 'src/lib/configuration';
import { Logger } from '@samurais-app/command-lib';
import { AbstractCommand } from './abstract.command';
import { Input } from './command.input';


export class ImportCommand extends AbstractCommand {
    public load(program: Command): void {
        program
            .command('import [name]')
            .description('导入模块')
            .option(
                '-a, --application [application]',
                '导出环境(development、production)',
                'development',
            )
            .option(
                '-e, --env [env]',
                '导出环境(development、production)',
                'development',
            )
            .action(async (name: string, command: Command & { [key: string]: any }) => {
                const options: Input[] = [];
                const inputs: Input[] = [];
                const config = new Configuration();
                config.check();
                if (!name) Logger.error('请输入导入项目名称');
                if (!command.application) Logger.error('请输入需要导入的项目');
                inputs.push({ name: 'name', value: name });
                options.push({ name: 'env', value: command.env });
                options.push({ name: 'config', value: config.path });
                options.push({ name: 'application', value: command.application });
                await this.action.handle(inputs, options);
            });
    }

}