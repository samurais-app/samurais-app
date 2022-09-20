/* eslint-disable @typescript-eslint/no-unused-vars */
import { Input } from 'src/commands';
import { createServer } from '@samurais-app/platform-server';
import { AbstractAction } from './abstract.action';
import { Configuration } from 'src/lib/configuration';

export class ServerAction extends AbstractAction {

    public async handle(inputs?: Input[], options?: Input[], extraFlags?: string[]): Promise<void> {
        const config = new Configuration();
        const server = createServer({ config });
        server.listen({ host: config.host, port: Number(config.port) });
    }


}