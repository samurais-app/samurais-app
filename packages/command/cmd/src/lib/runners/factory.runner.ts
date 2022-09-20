import { GitRunner, NpmRunner, YarnRunner, PnpmRunner, SchematicsRunner, Logger } from '@samurais-app/command-lib';
import { Runner } from './runners';
import { WebpackRunner } from './webpack.runner';

export class RunnerFactory {
    public static create(runner: Runner) {
        switch (runner) {
        case Runner.SCHEMATICS:
            return new SchematicsRunner();
            break;
        case Runner.GIT:
            return new GitRunner();
            break;
        case Runner.NPM:
            return new NpmRunner();
            break;
        case Runner.YARN:
            return new YarnRunner();
        case Runner.PNPM:
            return new PnpmRunner();
        case Runner.WEBPACK:
            return new WebpackRunner();
        default:
            return Logger.error('not runnner %s', runner);
        }
    }
}