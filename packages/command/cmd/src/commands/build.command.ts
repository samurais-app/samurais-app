import { Command } from 'commander';
import { AbstractCommand } from './abstract.command';
import { Input } from './command.input';
import { Configuration } from 'src/lib/configuration';

export class BuildCommand extends AbstractCommand {
    public load(program: Command): void {
        program
            .command('build [name]')
            .description('打包项目')
            .option(
                '-e, --env [env]',
                '项目类型(development、production)',
                'development',
            )
            .action(async (name: string, command: Command & { [key: string]: any }) => {
                const options: Input[] = [];
                const inputs: Input[] = [];
                const config = new Configuration();
                config.check();
                config.env = command.env;
                inputs.push({ name: 'name', value: name });
                options.push({ name: 'config', value: config.path });
                await this.action.handle(inputs, options);
            });
    }
}