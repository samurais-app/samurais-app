import { Command } from 'commander';
import { join } from 'path';
import { AbstractAction } from '../actions/abstract.action';
import { existsSync } from 'fs';
import { Logger } from '@samurais-app/command-lib';

const localBinPathSegments = [process.cwd(), 'node_modules', '.bin', 'samuras'];
export abstract class AbstractCommand {
    constructor(protected action: AbstractAction) { }

    protected check() {
        const cmdFilePath = join(...localBinPathSegments);
        if (!existsSync(cmdFilePath)) {
            Logger.error('当前工程下缺少cli依赖,请执行下面的命令:\nnpm install @samurais-app/cmd -D');
        }
    }

  public abstract load(program: Command): void;
}