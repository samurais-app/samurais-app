export enum Package {
  NPM = 'npm',
  YARN = 'yarn',
  PNPM = 'pnpm',
}

export interface PackageCommands {
  install: string;
  add: string;
  update: string;
  remove: string;
  saveFlag: string;
  saveDevFlag: string;
  silentFlag: string;
  force?: string;
}

export interface ProjectDependency {
  name: string;
  version: string;
}