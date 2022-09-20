import { readdir } from 'fs';
import { AbstractPackage } from './abstract.package';
import { NpmPackage } from './npm.package';
import { Package } from './package';
import { PnpmPackage } from './pnpm.package';
import { YarnPackage } from './yarn.package';

export class PackageFactory {
    public static create(name: Package | string): AbstractPackage {
        switch (name) {
        case Package.NPM:
            return new NpmPackage();
        case Package.YARN:
            return new YarnPackage();
        case Package.PNPM:
            return new PnpmPackage();
        default:
            throw new Error(`Package manager ${name} is not managed.`);
        }
    }

    public static async find(cwd?: string): Promise<AbstractPackage> {
        return new Promise<AbstractPackage>((resolve) => {
            readdir(cwd || process.cwd(), (error, files) => {
                if (error) {
                    resolve(this.create(Package.NPM));
                } else {
                    if (files.findIndex((filename) => filename === 'yarn.lock') > -1) {
                        resolve(this.create(Package.YARN));
                    } else if (
                        files.findIndex((filename) => filename === 'pnpm-lock.yaml') > -1
                    ) {
                        resolve(this.create(Package.PNPM));
                    } else {
                        resolve(this.create(Package.NPM));
                    }
                }
            });
        });
    }
}