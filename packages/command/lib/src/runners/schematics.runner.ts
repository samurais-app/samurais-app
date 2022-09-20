import { AbstractRunner } from './abstract.runner';


export class SchematicsRunner extends AbstractRunner {
    constructor() { super('node', [SchematicsRunner.findClosestSchematicsBinary()]); }
    public static getModulePaths() {
        return module.paths;
    }

    public static findClosestSchematicsBinary(): string {
        try {
            return require.resolve(
                '@angular-devkit/schematics-cli/bin/schematics.js',
                { paths: this.getModulePaths() },
            );
        } catch {
            throw new Error('\'schematics\' binary path could not be found!');
        }
    }
}