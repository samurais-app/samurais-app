import { Command } from 'commander';
import { AbstractCommand } from './abstract.command';


export class PublishCommand extends AbstractCommand {
    public load(program: Command): void {
        program
            .command('publish [name]')
            .alias('p')
            .description('启动项目')
            .action(async () => {
                await this.action.handle();
            });
    }

}