import { Command } from 'commander';
import { InitCommand } from './init.command';
import { BuildAction, CreateAction, ExposesAction, ImportAction, InitAction, LoginAction, PublishAction, StartAction } from '../actions';
import { Logger } from '@samurais-app/command-lib';
import { CreateCommand } from './create.command';
import { BuildCommand } from './build.command';
import { StartCommand } from './start.command';
import { ExposesCommand } from './exposes.command';
import { ImportCommand } from './import.command';
import { PublishCommand } from './publish.command';
import { LoginCommand } from './login.command';

export class CommandLoader {
    public static load(program: Command): void {
        new InitCommand(new InitAction()).load(program);
        new StartCommand(new StartAction()).load(program);
        new CreateCommand(new CreateAction()).load(program);
        new ExposesCommand(new ExposesAction()).load(program);
        new BuildCommand(new BuildAction()).load(program);
        new ImportCommand(new ImportAction()).load(program);
        new PublishCommand(new PublishAction()).load(program);
        new LoginCommand(new LoginAction()).load(program);
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