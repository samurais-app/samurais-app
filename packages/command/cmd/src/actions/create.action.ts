import { Input } from 'src/commands';
import question, { Answers, Question } from 'inquirer';
import { AbstractPackage, PackageFactory, generateInput, Logger, normalizeToKebabOrSnakeCase } from '@samurais-app/command-lib';
import { AbstractCollection, Collection, CollectionFactory } from 'src/lib/schematics';
import { join } from 'path';
import { MESSAGE } from 'src/lib/ui';
import { AbstractAction } from './abstract.action';
import { RuntimeType } from 'src/lib/runtimes';
import { Configuration } from 'src/lib/configuration';


export class CreateAction extends AbstractAction {
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
    private async startApplicationQuestion(inputs: Input[]) {
        Logger.info(`${MESSAGE.APPLICATION_INITIAL_START}\n`);
        const nameInput = this.getApplicationNameInput(inputs);
        if (!nameInput.value) {
            const _question = question.createPromptModule();
            const message = '请为新的项目进行命名!';
            const questions = [generateInput('name', message)('app')];
            const answers: Answers = await _question(questions as ReadonlyArray<Question>);
            this.replaceInputMissingInformation(inputs, answers);
        }
    }

    private getApplicationDirectory(
        applicationName: Input,
        directoryOption?: Input,
    ): string {
        return join(directoryOption.value as string, normalizeToKebabOrSnakeCase(applicationName.value as string));
    }

    private async createApplicationFiles(inputs?: Input[], options?: Input[]) {
        const _options = options.filter((opt) => !['config', 'packagesDirectory'].includes(opt.name));
        const collectionName = options.find((option) => option.name === 'collection')!.value;
        const packagesDirectory = options.find(
            (option) => option.name === 'packagesDirectory',
        )!.value;
        const collection: AbstractCollection = CollectionFactory.create((collectionName as Collection) || Collection.SAMURAIS);
        await collection.execute('application', collection.mapSchematicOptions(inputs.concat(_options)), packagesDirectory as string);
    }

    private async installPackages(
        installDirectory: string,
    ) {

        const packageManager: AbstractPackage = await PackageFactory.find(process.cwd());
        await packageManager.install(join(process.cwd(), normalizeToKebabOrSnakeCase(installDirectory)), packageManager.name.toLowerCase());
    }

    public async handle(inputs?: Input[], options?: Input[], extraFlags?: string[]): Promise<void> {
        await this.startApplicationQuestion(inputs);
        const name = this.getApplicationNameInput(inputs)!.value as string;
        const type = options.find((option) => option.name === 'type')!.value as RuntimeType;
        const config = new Configuration();
        config.check();
        if (!config.has(name)) {
            config.addApplication(name, { exposes: [], remotes: [] });
        }
        const application = config.getApplication(name);
        await application.check();
        options.push({ name: 'packagesDirectory', value: join(config.root, config.packages) });
        await this.createApplicationFiles(inputs, options);

        application.type = type;
        application.url = config.url;
        config.update();
        await this.installPackages('.');
        process.exit(0);
    }
}