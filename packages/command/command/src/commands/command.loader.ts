import { Command } from 'commander';
import { InitAction, ServerAction } from 'src/actions';
import { Logger } from '@samurais-app/command-lib';
import { ServerCommand } from './server.command';
import { InitCommand } from './init.command';
export class CommandLoader {
    public static load(program: Command): void {
        new ServerCommand(new ServerAction()).load(program);
        new InitCommand(new InitAction).load(program);
        this.handleInvalidCommand(program);
    }

    private static handleInvalidCommand(program: Command) {
        program.on('command:*', () => {
            Logger.error('未知命令: %s', program.args.join(' '));
            Logger.info('有关可用命令的列表，请参见 --help.\n');
            process.exit(1);
        });
    }
}