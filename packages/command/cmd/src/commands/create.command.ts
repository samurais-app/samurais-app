import { Command } from 'commander';
import { AbstractCommand } from './abstract.command';
import { Input } from './command.input';
import { Collection } from 'src/lib/schematics';
import { RuntimeType } from 'src/lib/runtimes';
import { Configuration } from 'src/lib/configuration';

export class CreateCommand extends AbstractCommand {

    public load(program: Command): void {
        program
            .command('create [name]')
            .alias('c')
            .description('创建一个项目')
            .option(
                '-t, --type [type]',
                '项目类型(react、vue)',
                RuntimeType.REACT,
            )
            .action(async (name: string, command: Command & { [key: string]: any }) => {
                const options: Input[] = [];
                const inputs: Input[] = [];
                const config = new Configuration();
                config.check();
                inputs.push({ name: 'name', value: name });
                options.push({ name: 'type', value: command.type });
                options.push({ name: 'config', value: config.path });
                options.push({ name: 'collection', value: Collection.SAMURAIS });
                await this.action.handle(inputs, options);
            });
    }
}