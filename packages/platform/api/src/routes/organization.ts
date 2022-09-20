import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import { IApiOptions } from '..';

export default fp<IApiOptions>(async function (instance: FastifyInstance, options) {
    const { prefix } = options;
    instance.get(`${prefix}/all`, (req, res) => {
        res.code(200).send();
    });

    instance.get(`${prefix}/:id`, (req, res) => {
        res.code(200).send();
    });
}, { fastify: '>=3.x', name: 'api/organization' });
export const autoPrefix = '/organization';