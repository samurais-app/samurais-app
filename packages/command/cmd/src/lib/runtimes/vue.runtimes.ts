
import { Cache, Plugin } from 'src/lib/interfaces';
import { RuleSetRule } from 'webpack';
import { WebpackRunner } from 'src/lib/runners';
import { AbstractRuntime } from './abstract.runtimes';
import { RuntimeType } from './runtimes';


export class VueRuntime extends AbstractRuntime {
    protected getRemotes(): Record<string, string> {
        throw new Error('Method not implemented.');
    }
    protected cache(): Cache {
        throw new Error('Method not implemented.');
    }
    protected rules(): RuleSetRule[] {
        throw new Error('Method not implemented.');
    }
    protected plugins(): Plugin[] {
        throw new Error('Method not implemented.');
    }
    constructor(runner: WebpackRunner) { super(RuntimeType.VUE, runner); }
}