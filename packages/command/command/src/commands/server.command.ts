import { Command } from 'commander';
import { Configuration } from 'src/lib/configuration';
import { Environment } from '@samurais-app/lib';
import { AbstractCommand } from './abstract.command';
import { Input } from './command.input';

export class ServerCommand extends AbstractCommand {
    public load(program: Command): void {
        program
            .command('start')
            .description('启动微前端管理平台')
            .option('-e, --env [env]', '服务启动配置文件', Environment.production)
            .action(async (command: Command & { env: string, doc }) => {
                const inputs: Input[] = [];
                const options: Input[] = [];
                const config = new Configuration();
                config.init(command.env as Environment);
                await config.load();
                config.check();
                options.push({ name: 'env', value: command.env });
                await this.action.handle(inputs, options);
            });
    }


}