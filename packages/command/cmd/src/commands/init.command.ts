import { Command } from 'commander';
import { generateInput, Logger } from '@samurais-app/command-lib';
import { Collection } from '../lib/schematics';
import { AbstractCommand } from './abstract.command';
import { Input } from './command.input';
import { MESSAGE } from '../lib/ui';
import inquirer, { Answers, Question } from 'inquirer';
import { Configuration } from 'src/lib/configuration';

export class InitCommand extends AbstractCommand {
    private getApplicationNameInput(inputs: Input[]) { return inputs.find((input) => input.name === 'name'); }
    private replaceInputMissingInformation(
        inputs: Input[],
        answers: Answers,
    ): Input[] {
        return inputs.map(
            (input) =>
                (input.value =
                input.value !== undefined ? input.value : answers[input.name]),
        );
    };
    private async startProjectQuestion(inputs: Input[]) {
        Logger.info(`${MESSAGE.PROJECT_INITIAL_START}\n`);
        const nameInput = this.getApplicationNameInput(inputs);
        if (!nameInput.value) {
            const _question = inquirer.createPromptModule();
            const message = '请为新的工程进行命名!';
            const questions = [generateInput('name', message)('app')];
            const answers: Answers = await _question(questions as ReadonlyArray<Question>);
            this.replaceInputMissingInformation(inputs, answers);
        }
    }

    private async startProjectOptionQuestion(options: Input[]) {
        const _question = inquirer.createPromptModule();
        const questions = [
            generateInput('author', '请输入创建者信息')(''),
            generateInput('description', '请输入工程描述信息')(''),
        ];
        const { author, description } = await _question(questions as ReadonlyArray<Question>);
        options.push({ name: 'author', value: author });
        options.push({ name: 'description', value: description });
    }

    public load(program: Command): void {
        program
            .command('init [name]')
            .alias('i')
            .description('初始化一个工程')
            .option('--directory [directory]', '指定目标目录')
            .option('-d, --dry-run', '在不输出结果的情况下执行的操作.', false)
            .option('-g, --skip-git', '跳过git存储库初始化.', false)
            .option('-s, --skip-install', '跳过依赖包安装.', false)
            .option('-c, --collection [collectionName]', '使用的模版包', Collection.SAMURAIS,)
            .option(
                '-p, --package-manager [package-manager]',
                '包管理器.'
            )
            .action(async (name: string, command: Command & { [key: string]: any }) => {
                const options: Input[] = [];
                const inputs: Input[] = [];
                inputs.push({ name: 'name', value: name });
                await this.startProjectQuestion(inputs);
                await this.startProjectOptionQuestion(options);
                const config = new Configuration();
                config.name = inputs.find((input) => input.name === 'name')!.value as string;
                options.push({ name: 'directory', value: command.directory });
                options.push({ name: 'dry-run', value: command.dryRun });
                options.push({ name: 'skip-git', value: command.skipGit });
                options.push({ name: 'skip-install', value: command.skipInstall });
                options.push({ name: 'collection', value: command.collection });
                options.push({
                    name: 'package-manager',
                    value: command.packageManager,
                });
                await this.action.handle(inputs, options);
            });
    }
}