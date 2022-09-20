import { Command } from 'commander';
import { Configuration } from 'src/lib/configuration';
import { Logger } from '@samurais-app/command-lib';
import { AbstractCommand } from './abstract.command';
import { Input } from './command.input';


export class StartCommand extends AbstractCommand {
    public load(program: Command): void {
        program
            .command('start [name]')
            .alias('s')
            .description('启动项目')
            .option(
                '-e, --env [env]',
                '项目类型(development、production)',
                'development',
            )
            .option('-e, --expose [expose]', '是否对外暴露当前启动的应用', false)
            .action(async (name: string, command: Command & { [key: string]: any }) => {
                const options: Input[] = [];
                const inputs: Input[] = [];
                const config = new Configuration();
                config.check();
                config.env = command.env;
                if (!name) Logger.error('请选择需要启动的项目');
                inputs.push({ name: 'name', value: name });
                options.push({ name: 'config', value: config.path });
                options.push({ name: 'expose', value: !!command.expose });
                await this.action.handle(inputs, options);
            });
    }
}