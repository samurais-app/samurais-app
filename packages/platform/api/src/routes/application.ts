import { Payload } from '@samurais-app/lib';
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { IApiOptions } from '..';

export default fp<IApiOptions>(async function (instance: FastifyInstance, options) {
    const { prefix } = options;
    // 获取工程下的应用列表
    instance.get(`${prefix}/:project/list`, (req, res) => {
        res.code(200).send(new Payload({ code: 1, message: '' }));
        res.send;
    });

    instance.get(`${prefix}`, (req, res) => {
        res.code(200).send(1);
    });

    // 创建应用
    instance.post(`${prefix}/:project/create`, (req, res) => {
        res.code(200).send(new Payload({ code: 1, message: '' }));
    });
}, { fastify: '>=3.x', name: 'api/application' });

export const autoPrefix = '/application';