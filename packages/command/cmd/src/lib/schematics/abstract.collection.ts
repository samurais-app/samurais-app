import { Input } from 'src/commands';
import { AbstractRunner } from '@samurais-app/command-lib';
import { SchematicOption } from './schematic.options';

export class AbstractCollection {
    constructor(protected collection: string, protected runner: AbstractRunner) { }

    public mapSchematicOptions(options: Input[]): SchematicOption[] {
        return options.reduce(
            (schematicOptions: SchematicOption[], option: Input) => {
                if (
                    option.name !== 'skip-install' &&
                    option.value !== 'package-manager'
                ) {
                    schematicOptions.push(new SchematicOption(option.name, option.value));
                }
                return schematicOptions;
            },
            [],
        );
    };

    public async execute(
        name: string,
        options: SchematicOption[],
        cwd: string = process.cwd(),
        extraFlags?: string,
    ) {
        let command = this.buildCommandLine(name, options);
        command = extraFlags ? command.concat(` ${extraFlags}`) : command;
        await this.runner.run(command, false, cwd);
    }

    private buildCommandLine(name: string, options: SchematicOption[]): string {
        return `${this.collection}:${name}${this.buildOptions(options)}`;
    }

    private buildOptions(options: SchematicOption[]): string {
        return options.reduce((line, option) => {
            return line.concat(` ${option.toCommandString()}`);
        }, '');
    }
}
