import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { Plugin } from '@samurais-app/platform-core';
import { Payload } from '@samurais-app/lib';
import { IApiOptions } from '..';
import { validatorCompiler } from 'src/utils';
import { AccountSchema } from 'src/schemas';

export default fp<IApiOptions>(async function (instance: FastifyInstance, options) {
    const { prefix } = options;
    const plugin = instance.config.getPlugin(Plugin.AUTH);


    // Logging in to the system
    instance.post(`${prefix}/login`, {
        schema: {
            body: AccountSchema
        },
        validatorCompiler
    }, async (req, res) => {
        // if (!plugin) res.code(500).send('暂无账号');
        // plugin.login(req.body as Account);
        res.code(500).send('暂无账号');
    });

    // Exiting the current System
    instance.post(`${prefix}/loginout`, async (req, res) => {
        const status = await plugin.loginOut();
    });

    // 查找账号
    instance.get(`${prefix}/account`, (req, res) => {
        res.code(200).send(new Payload({ code: 1, message: '' }));
    });

    instance.get(`${prefix}/check`, (req, res) => {
        res.code(200).send(new Payload({ code: 1, message: '' }));
    });
}, { fastify: '>=3.x', name: 'api/account' });

export const autoPrefix = '/account';