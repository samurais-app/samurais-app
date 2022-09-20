import { AbstractStoragePlugin } from '@samurais-app/platform-core';


// Default repository
export default class StorePlugin extends AbstractStoragePlugin {
    init(): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    add(name: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    remove(name: string): Promise<void> {
        throw new Error('Method not implemented.');
    }
    synchronization(): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    check(options?: any): boolean {
        throw new Error('Method not implemented.');
    }
    getOptions() {
        throw new Error('Method not implemented.');
    }

}