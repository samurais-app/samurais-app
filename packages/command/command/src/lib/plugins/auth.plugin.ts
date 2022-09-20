import { Package, PackageFactory } from '@samurais-app/command-lib';
import { AbstractPlugin } from './abstract.plugin';

export class AuthPlugin extends AbstractPlugin {
    constructor(name: string) { super(name, PackageFactory.create(Package.NPM)); }
}