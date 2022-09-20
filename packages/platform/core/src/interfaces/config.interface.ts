import { Environment, Protocol } from '@samurais-app/lib';
import { IPlugin, PluginType } from '..';

export enum Plugin {
  WEB = 'web',
  AUTH = 'auth',
  STORAGE = 'storage'
}

export interface IConfigurationDoc<PO = any> {
  port: string;
  host: string;
  protocol: Protocol;
  plugins: IPlugin<PO>[];
}
export type GetPlugin = <P extends Plugin>(type?: P) => PluginType<P>;

export interface IConfig {
  env: Environment
  port: string;
  host: string;
  root: string;
  protocol: Protocol;
  path: string;
  plugins: IPlugin[];
  init: (env: Environment) => void;
  load: () => void;
  getPlugin: GetPlugin;
  create: () => void;
  check: () => void;
  update: () => void;
}