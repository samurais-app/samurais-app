import { Environment } from '@samurais-app/lib';
import inquirer, { Answers, Question } from 'inquirer';
import { Command } from 'commander';
import { AbstractCommand } from './abstract.command';
import { Input } from './command.input';
import { generateInput, Logger } from '@samurais-app/command-lib';

type Option = {
    account?: string;
    password?: string;
    env: Environment;
}

export class LoginCommand extends AbstractCommand {

    private async checkAccount(_account?: string): Promise<Input> {
        if (!_account) {
            const _question = inquirer.createPromptModule();
            const message = '请输入账号';
            const questions = [generateInput('account', message)('')];
            const { account } = await _question(questions as ReadonlyArray<Question>);
            if (!account) Logger.error('请输入账号');
            return { name: 'account', value: account };
        }
        return { name: 'account', value: _account };
    }

    private async checkPassword(_password?: string): Promise<Input> {
        if (!_password) {
            const _question = inquirer.createPromptModule();
            const message = '请输入密码';
            const questions = [generateInput('password', message)('')];
            const { password } = await _question(questions as ReadonlyArray<Question>);
            if (!password) Logger.error('请输入密码');
            return { name: 'password', value: password };
        }
        return { name: 'password', value: _password };
    }


    public load(program: Command): void {
        program.command('login')
            .description('登录到平台')
            .option('-a, --account [account]', '账号')
            .option('-p, --password [password]', '密码')
            .option(
                '-e, --env [env]',
                '导出环境(development、production、stage、test)',
                Environment.production,
            )
            .action(async (command: Command & Option) => {
                const { account, password, env } = command;
                const inputs: Input[] = [];
                const options: Input[] = [];
                const _account = await this.checkAccount(account);
                const _password = await this.checkPassword(password);
                options.push(_account);
                options.push(_password);
                options.push({ name: 'env', value: env });
                await this.action.handle(inputs, options);
            });
    }

}