/* eslint-disable @typescript-eslint/no-unused-vars */
import { AbstractWebPlugin, IWebPluginOptions } from '@samurais-app/platform-core';
import { join, extname } from 'path';

export default class WebPlugin extends AbstractWebPlugin {
    getOptions(): IWebPluginOptions {
        return {
            ...this.options,
            root: join(this.options.base, this.options.root),
            prefix: this.options.prefix,
            filter: !this.options.filter || !Array.isArray(this.options.filter) ? [] : this.options.filter,
        };
    }
    check(_options?: IWebPluginOptions | undefined): boolean {
        if(!_options.component) return false;
        if(!_options.home) return false;
        if(!_options.login) return false;
        if(!_options.root) return false;
        if(!_options.assets || !extname(_options.assets).includes('.json')) return false;
        return true;
    }
}