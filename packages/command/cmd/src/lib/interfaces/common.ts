import { WebpackPluginInstance, Compiler, Configuration, FileCacheOptions, RuleSetRule } from 'webpack';

export interface MemoryCacheOptions {
  cacheUnaffected?: boolean;
  maxGenerations?: number;
  type: 'memory';
}

export interface SharedConfig {
  eager?: boolean;
  import?: string | false;
  packageName?: string;
  requiredVersion?: string | false;
  shareKey?: string;
  shareScope?: string;
  singleton?: boolean;
  strictVersion?: boolean;
  version?: string | false;
}

export interface SharedObject {
  [index: string]: string | SharedConfig;
}

export type CompilerInstance = Compiler;
export type Plugin = (WebpackPluginInstance | ((this: Compiler, compiler: Compiler) => void));
export type Shared = SharedObject | (string | SharedObject)[];
export type PluginInstance = WebpackPluginInstance;
export type Rule = RuleSetRule;
export type Config = Configuration;
export type Cache = boolean | FileCacheOptions | MemoryCacheOptions;