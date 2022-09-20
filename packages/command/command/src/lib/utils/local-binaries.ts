import { existsSync } from 'fs';
import { join, posix } from 'path';
import { CommandLoader } from 'src/commands';

const localBinPathSegments = [process.cwd(), 'node_modules', '@samuras', 'platform-cmd'];

export function localBinExists() {
    console.log();
    return existsSync(join(...localBinPathSegments));
}

export function loadLocalBinCommandLoader(): typeof CommandLoader {
    const commandsFile = require(posix.join(...localBinPathSegments,'build', 'commands'));
    return commandsFile.CommandLoader;
}