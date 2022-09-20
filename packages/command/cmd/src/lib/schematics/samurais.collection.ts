import { AbstractRunner, Logger } from '@samurais-app/command-lib';
import { AbstractCollection } from './abstract.collection';
import { Collection } from './collection';
import { SchematicOption } from './schematic.options';

export interface Schematic {
  name: string;
  alias: string;
  description: string;
}

export class SamuraisCollection extends AbstractCollection {
    private static schematics: Schematic[] = [{
        name: 'project',
        alias: 'project',
        description: 'Generate a new project workspace',
    }, {
        name: 'application',
        alias: 'application',
        description: 'Generate a new application',
    },];
    constructor(runner: AbstractRunner) { super(Collection.SAMURAIS, runner); }

    private validate(name: string) {
        const schematic = SamuraisCollection.schematics.find(
            (s) => s.name === name || s.alias === name,
        );
        if (schematic === undefined || schematic === null) {
            Logger.error(`无效的模版${name},请确保模版${name}在${Collection.SAMURAIS}这个包中存在`);
        }
        return schematic.name;
    }

    public async execute(name: string, options: SchematicOption[], cwd: string = process.cwd()): Promise<void> {
        const schematic: string = this.validate(name);
        await super.execute(schematic, options, cwd);
    }
}