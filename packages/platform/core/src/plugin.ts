import { Account } from '@samurais-app/lib';
import { Plugin } from './interfaces';

export interface IPlugin<O = any> {
  version: string;
  type: Plugin;
  name: string;
  options?: O
}
export type PluginType<E extends Plugin> = E extends Plugin.AUTH ? AbstractAuthPlugin : E extends Plugin.WEB ? AbstractWebPlugin : E extends Plugin.STORAGE ? AbstractStoragePlugin : undefined;
export type PluginOptions = IWebPluginOptions | any;
export abstract class IPluginClass<O = any> implements Omit<IPlugin<O>, 'options' | 'type'> {
    constructor(readonly name: string, readonly version: string, protected options?: O) { }
  public abstract check(options?: O): boolean;
  public abstract getOptions(...args: any): O;
}
export type IStoragePluginOptions = {
  base?: string;
  path: string;
}
export abstract class AbstractStoragePlugin extends IPluginClass<IStoragePluginOptions> {
    readonly type: Plugin = Plugin.STORAGE;
  public abstract add(name: string): Promise<void>;
  public abstract remove(name: string): Promise<void>;
  public abstract check(options?: IStoragePluginOptions): boolean;
  public abstract getOptions(): IStoragePluginOptions;
  public abstract init(): Promise<boolean>;
  public abstract synchronization(): Promise<boolean>;
}

// web plugin

export type IWebUiOption = {
  ui: string;
  base?: string;
  root: string,
  assets: string,
}

export type IWebPluginOptions = {
  component: string;
  version: string;
  root: string;
  assets: string,
  home: string,
  login: string,
  base?: string;
  prefix?: string,
  filter?: string[],
}

export abstract class AbstractWebPlugin extends IPluginClass<IWebPluginOptions> {
    readonly type: Plugin = Plugin.WEB;
  public abstract getOptions(): IWebPluginOptions;
}

// auth plugin
export type IAuthPluginRedisClient = {
  base?: string;
  host: string;
  port: string;
}

export type IAuthPluginOptions = {
  client: IAuthPluginRedisClient | IAuthPluginRedisClient[];
  username: string,
  password: string,
  db: string,
}
export abstract class AbstractAuthPlugin extends IPluginClass<IAuthPluginOptions> {
    readonly type: Plugin = Plugin.AUTH;
  public abstract login(payload: Account): Promise<string>;
  public abstract loginOut(): Promise<boolean>;
  public abstract checkToken(token: string): Promise<boolean>;
}