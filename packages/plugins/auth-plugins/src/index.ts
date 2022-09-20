import { Account } from '@samurais-app/lib';
import { AbstractAuthPlugin, IAuthPluginOptions } from '@samurais-app/platform-core'

export default class AuthPlugin extends AbstractAuthPlugin {
    getOptions(): IAuthPluginOptions {
        return this.options;
    }
    login(payload: Account): Promise<string> {
        throw new Error('Method not implemented.');
    }
    loginOut(): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    checkToken(token: string): Promise<boolean> {
        throw new Error('Method not implemented.');
    }
    check(options?: any): boolean {
        return true
    }
}
