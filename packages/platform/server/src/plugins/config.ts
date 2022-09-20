/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { IConfig } from '@samurais-app/platform-core';

declare module 'fastify' {
    interface FastifyInstance {
        config: IConfig
    }
}

export default fp(async function (instance: FastifyInstance, options: IConfig) {
    instance.decorate('config', options);
    instance.decorateReply('config', options);
}, { fastify: '>=3.x', name: 'config' });