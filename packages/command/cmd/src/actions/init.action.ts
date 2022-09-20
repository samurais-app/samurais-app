import { Input } from 'src/commands';
import question, { Answers, Question } from 'inquirer';
import {
    generateSelect,
    Logger,
    GitRunner,
    AbstractPackage,
    Package,
    PackageFactory,
    normalizeToKebabOrSnakeCase
} from '@samurais-app/command-lib';
import { AbstractCollection, Collection, CollectionFactory } from 'src/lib/schematics';
import { MESSAGE } from 'src/lib/ui';
import { AbstractAction } from './abstract.action';
import { join } from 'path';
import { existsSync, mkdirSync, writeFile } from 'fs';
import { promisify } from 'util';
import { Configuration } from 'src/lib/configuration';

export const defaultGitIgnore = `# compiled output
/dist
/node_modules

# Logs
logs
*.log
npm-debug.log*
pnpm-debug.log*
yarn-debug.log*
yarn-error.log*
lerna-debug.log*

# OS
.DS_Store

# Tests
/coverage
/.nyc_output

# IDEs and editors
/.idea
.project
.classpath
.c9/
*.launch
.settings/
*.sublime-workspace

# IDE - VSCode
.vscode/*
!.vscode/settings.json
!.vscode/tasks.json
!.vscode/launch.json
!.vscode/extensions.json`;

export class InitAction extends AbstractAction {

    private getApplicationNameInput(inputs: Input[]) { return inputs.find((input) => input.name === 'name'); }

    private getProjectDirectory(
        applicationName: Input,
        directoryOption?: Input,
    ): string {
        return (
            (directoryOption && (directoryOption.value as string)) ||
            normalizeToKebabOrSnakeCase(applicationName.value as string)
        );
    }

    private async createApplicationFiles(inputs?: Input[], options?: Input[]) {
        const collectionName = options.find((option) => option.name === 'collection')!.value;
        const collection: AbstractCollection = CollectionFactory.create((collectionName as Collection) || Collection.SAMURAIS);
        await collection.execute('project', collection.mapSchematicOptions(inputs.concat(options)));
    }

    private async askForPackageManager(): Promise<Answers> {
        const questions: Question[] = [
            generateSelect('package-manager')(MESSAGE.PACKAGE_MANAGER_QUESTION)([
                Package.NPM,
                Package.YARN,
                Package.PNPM,
            ]),
        ];
        const prompt = question.createPromptModule();
        return await prompt(questions);
    };

    private async selectPackageManager(): Promise<AbstractPackage> {
        const answers: Answers = await this.askForPackageManager();
        return PackageFactory.create(answers['package-manager']);
    };

    private async initializeGitRepository(dir: string) {
        const runner = new GitRunner();
        await runner.run('init', true, join(process.cwd(), dir)).catch(() => {
            Logger.error(MESSAGE.GIT_INITIALIZATION_ERROR);
        });
    };

    private async installPackages(
        options: Input[],
        dryRunMode: boolean,
        installDirectory: string,
    ) {
        const inputPackage: string = options.find(
            (option) => option.name === 'package-manager',
        )!.value as string;

        let packageManager: AbstractPackage;
        if (dryRunMode) {
            console.info();
            Logger.info(MESSAGE.DRY_RUN_MODE);
            console.info();
            return;
        }
        if (inputPackage !== undefined) {
            try {
                packageManager = PackageFactory.create(inputPackage);
                await packageManager.install(join(process.cwd(), normalizeToKebabOrSnakeCase(installDirectory)), inputPackage);
            } catch (error: any) {
                if (error && error.message) {
                    Logger.error(error.message);
                }
            }
        } else {
            packageManager = await this.selectPackageManager();
            await packageManager.install(join(process.cwd(), normalizeToKebabOrSnakeCase(installDirectory)), packageManager.name.toLowerCase());
        }
    }

    private createGitIgnoreFile(dir: string, content?: string) {
        const fileContent = content || defaultGitIgnore;
        const filePath = join(process.cwd(), dir, '.gitignore');

        if (existsSync(filePath)) {
            return;
        }
        return promisify(writeFile)(filePath, fileContent);
    };

    public async handle(inputs?: Input[], options?: Input[], extraFlags?: string[]): Promise<void> {
        const directoryOption = options.find(
            (option) => option.name === 'directory',
        );
        const shouldSkipInstall = options.some(
            (option) => option.name === 'skip-install' && option.value === true,
        );
        const shouldSkipGit = options.some(
            (option) => option.name === 'skip-git' && option.value === true,
        );
        const config = new Configuration();
        const isDryRunEnabled = !!options.find((option) => option.name === 'dry-run')!.value;
        await this.createApplicationFiles(inputs, options).catch((e) => {
            process.exit(1);
        });


        const projectDirectory = this.getProjectDirectory(
            this.getApplicationNameInput(inputs)!,
            directoryOption,
        );
        if (!shouldSkipInstall) {
            await this.installPackages(options, isDryRunEnabled, projectDirectory);
        }
        if (!isDryRunEnabled) {
            if (!shouldSkipGit) {
                await this.initializeGitRepository(projectDirectory);
                await this.createGitIgnoreFile(projectDirectory);
            }
        }
        const packagePath = join(process.cwd(), projectDirectory, config.packages);
        if (!existsSync(packagePath)) mkdirSync(packagePath, { recursive: true });
        config.name = projectDirectory;
        config.create();
        Logger.info('成功创建工程');
        process.exit(0);
    }
}