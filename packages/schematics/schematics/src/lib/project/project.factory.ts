import { join, Path, strings } from '@angular-devkit/core';
import {
  apply,
  mergeWith,
  move,
  Rule,
  Source,
  template,
  url,
} from '@angular-devkit/schematics';
import { basename, parse } from 'path';
import { normalizeToKebabOrSnakeCase } from '@samurais-app/schematics-utils';
import {
  DEFAULT_AUTHOR,
  DEFAULT_DESCRIPTION,
  DEFAULT_VERSION,
} from '../defaults';
import { ProjectOptions } from './project.schema';

export function main(options: ProjectOptions): Rule {
  options.name = normalizeToKebabOrSnakeCase(options.name.toString());
  const path =
    !options.directory || options.directory === 'undefined'
      ? options.name
      : options.directory;
  options = transform(options);
  return mergeWith(generate(options, path));
}

function transform(options: ProjectOptions): ProjectOptions {
  const target: ProjectOptions = Object.assign({}, options);

  target.author = !!target.author ? target.author : DEFAULT_AUTHOR;
  target.description = !!target.description
    ? target.description
    : DEFAULT_DESCRIPTION;
  target.name = resolvePackageName(target.name.toString());
  target.version = !!target.version ? target.version : DEFAULT_VERSION;

  target.packageManager =
    !target.packageManager || target.packageManager === 'undefined'
      ? 'npm'
      : target.packageManager;
  target.dependencies = !!target.dependencies ? target.dependencies : '';
  target.devDependencies = !!target.devDependencies
    ? target.devDependencies
    : '';
  return target;
}
function resolvePackageName(path: string) {
  const { base: baseFilename, dir: dirname } = parse(path);
  if (baseFilename === '.') {
    return basename(process.cwd());
  }
  if (dirname.match(/^@[^\s]/)) {
    return `${dirname}/${baseFilename}`;
  }
  return baseFilename;
}

function generate(options: ProjectOptions, path: string): Source {
  return apply(url(join('./files' as Path)), [
    template({
      ...strings,
      ...options,
    }),
    move(path),
  ]);
}
