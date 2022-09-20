export interface PluginOptions {
    name: string | number;
    author?: string;
    description?: string;
    directory?: string;
    strict?: boolean;
    version?: string;
    packageManager?: 'npm' | 'yarn' | 'pnpm' | 'undefined';
    dependencies?: string;
    packages?: string;
    devDependencies?: string;
  }
  