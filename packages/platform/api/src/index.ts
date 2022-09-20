import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { join } from 'path';
import autoload from '@fastify/autoload';
import { IConfig } from '@samurais-app/platform-core';

declare module 'fastify' {
    interface FastifyInstance {
        config: IConfig
    }
}

export interface IApiOptions {
    prefix: string
}

export default fp<IApiOptions>(async function (instance: FastifyInstance, options: IApiOptions) {
    instance.register(autoload, {
        dir: join(__dirname, 'routes'),
        options
    });
}, {
    fastify: '>=3.x',
    name: '@samurais-app/platform-api',
    dependencies: ['config']
});
