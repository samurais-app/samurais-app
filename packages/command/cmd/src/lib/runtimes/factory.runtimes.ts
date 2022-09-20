import { join } from 'path';
import { WebpackRunner } from '../runners';
import { RuntimeType } from './runtimes';
import { ReactRuntime } from './react.runtimes';
import { VueRuntime } from './vue.runtimes';

export class RuntimeFactory {
    static findAppType(path: string) {
        const packageJson = require(join(path, 'package.json'));
        const dependencies = Object.keys(packageJson.dependencies || {});
        const devDendencies = Object.keys(packageJson.devDependencies || {});
        if (dependencies.includes('react') || devDendencies.includes('@types/react')) return RuntimeType.REACT;
        if (dependencies.includes('vue') || devDendencies.includes('@types/vue')) return RuntimeType.VUE;
        return RuntimeType.TS;
    }

    static create(app: RuntimeType) {
        switch (app) {
        case RuntimeType.REACT:
            return new ReactRuntime(new WebpackRunner());
        case RuntimeType.VUE:
            return new VueRuntime(new WebpackRunner());
            break;
        default:
            break;
        }
    }
}