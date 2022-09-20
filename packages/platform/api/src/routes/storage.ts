import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { IConfig, Plugin } from '@samurais-app/platform-core';
import { Payload } from '@samurais-app/lib';
import { IApiOptions } from '..';


export default fp<IApiOptions>(async function (instance: FastifyInstance, options) {
    const { prefix } = options;
    const _instance = instance as FastifyInstance & { config: IConfig };
    const storage = _instance.config.getPlugin(Plugin.STORAGE);
    _instance.post(`${prefix}/publish`, async (req, res) => {
        const payload = new Payload(new Payload({ code: 500, message: '' }));
        if (!storage) return res.code(500).send(payload);
        return storage.add('')
            .then(() => {
                res.code(200).send(payload);
            })
            .catch(() => {
                res.code(500).send(payload);
            });
    });
}, { fastify: '>=3.x', name: 'api/storage' });

export const autoPrefix = '/storage';