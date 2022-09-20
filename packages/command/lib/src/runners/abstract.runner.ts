import { spawn } from 'child_process';

export abstract class AbstractRunner {
    constructor(protected readonly binary: string, protected args: string[] = []) { }

    public async exec(command: string, scripts: string, collect = false,
        cwd: string = process.cwd(),) {
        return new Promise<string | any>((resolve, reject) => {
            let _data = '';
            const child = spawn(`${command}`, [scripts], {
                cwd,
                stdio: collect ? 'pipe' : 'inherit',
                shell: true
            });
            if (collect) {
                child.stdout!.on('data', (data) => {
                    _data += data.toString().replace(/\r/, '');
                });
                child.stdout!.on('close', () => {
                    resolve(_data);
                });
            } else {
                child.on('close', (code) => {
                    if (code === 0) {
                        resolve(_data);
                    } else {
                        reject(_data);
                    }
                });
            }
        });
    }

    public async run(
        command: string,
        collect = false,
        cwd: string = process.cwd(),
    ) {
        const args: string[] = [command];
        return new Promise<string | any>((resolve, reject) => {
            let _data = '';
            const child = spawn(`${this.binary}`, [...this.args, ...args], {
                cwd,
                stdio: collect ? 'pipe' : 'inherit',
                shell: true
            });
            if (collect) {
                child.stdout!.on('data', (data) => {
                    _data += data.toString().replace(/\r\n|\n/, '');
                });
                child.stdout!.on('close', () => {
                    resolve(_data);
                });
            } else {
                child.on('close', (code) => {
                    if (code === 0) {
                        resolve(_data);
                    } else {
                        reject(_data);
                    }
                });
            }
        });
    }
}