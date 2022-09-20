import { Command } from 'commander';
import { Logger } from '@samurais-app/command-lib';
import { AbstractCommand } from './abstract.command';
import { Input } from './command.input';
import { extname } from 'path';
import { Configuration } from 'src/lib/configuration';


export class ExposesCommand extends AbstractCommand {
    public load(program: Command): void {
        program
            .command('exposes [file]')
            .description('导出一个模块')
            .option(
                '-e, --env [env]',
                '导出环境(development、production)',
                'development',
            )
            .action(async (file: string, command: Command & { [key: string]: any }) => {
                const options: Input[] = [];
                const config = new Configuration();
                config.check();
                if (!file) Logger.error('请输入导出的文件');
                const pathName = extname(file as string);
                if (!pathName) Logger.error('请输入正确的导出文件');
                options.push({ name: 'file', value: file });
                options.push({ name: 'env', value: command.env });
                options.push({ name: 'config', value: config.path });
                await this.action.handle([], options);
            });
    }

}