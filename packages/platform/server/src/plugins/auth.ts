/* eslint-disable @typescript-eslint/no-unused-vars */
import { AbstractAuthPlugin, Plugin } from '@samurais-app/platform-core';
import { FastifyInstance } from 'fastify';
import cookie from '@fastify/cookie';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import session from '@fastify/session';
import fp from 'fastify-plugin';


export const AUTH_KEY = 'user';
export const SECRET = 'TYKJKSDABUNQKJSDTYKJKSDABUNQKJSD';

export default fp(async function (instance: FastifyInstance) {
    const plugin = instance.config.getPlugin(Plugin.AUTH) as AbstractAuthPlugin;
    if(!plugin) return;
    const options = plugin.getOptions();
    if (!plugin.check(options)) return;
    const Store = connectRedis(session);

    function createCluster() {
        const { client, ...params } = options;
        const clientOptions = (client as any[]).map((cl) => ({ host: cl.host, port: Number(cl.port) }));
        return new Store({
            client: new Redis.Cluster(clientOptions, {
                redisOptions: { ...params } as any,
                slotsRefreshTimeout: 2000,
                scaleReads: 'slave',
                enableReadyCheck: true,
                enableOfflineQueue: true,
                retryDelayOnMoved: 2000,
            })
        });
    }

    function createSigle() {
        const { client, ...params } = options;
        return new Store({
            client: new Redis({ ...client, ...params } as unknown)
        });
    }

    instance.register(cookie);
    instance.register(session, {
        secret: SECRET,
        saveUninitialized: true,
        cookie: { secure: false, httpOnly: true, sameSite: true },
        store: Array.isArray(options.client) ? createCluster() : createSigle()
    });
}, { fastify: '>=3.x', dependencies: ['config'] });