/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import chalk from 'chalk';
import { v4 } from 'uuid';
import { Payload } from '@samurais-app/lib';
export default fp(async function (instance: FastifyInstance) {
    instance.addHook('preHandler', async (req, res) => {
        const id = v4().split('-').join('');
        const contentLength = req.headers['content-length'];
        res.header('traceID', id);
        res.header('pid', process.pid);
        req.log.info({
            size: contentLength ? contentLength : '',
            pid: process.pid,
            traceID: id,
            params: req.params,
            query: req.query,
            body: req.body,
        }, `${chalk.blue(req.ip)} ${chalk.bold.yellow('←')} ${chalk.yellow(req.method)}:${chalk.green(
            req.url
        )} ${contentLength ? contentLength : ''} `);
        req.log.trace(req, 'Request trace');
    });
    instance.addHook('onResponse', async (req, res) => {
        req.log.info({
            pid: res.getHeader('pid'),
            traceID: res.getHeader('traceID'),
        }, `${chalk.blue(req.ip)} ${chalk.bold.yellow('→')} ${chalk.yellow(req.method)}:${chalk.green(
            req.url
        )} ${chalk.magenta(res.statusCode)}`);
    });

    instance.addHook('preSerialization', async (req, res, payload) => {
        console.log('[payload]', payload);
        return payload;
    });

    instance.addHook('onSend', async (req, res, payload: any) => {
        switch (res.statusCode) {
        case 500:
            return JSON.stringify({ code: res.statusCode, message: JSON.parse(payload).message });
        default:
            return payload;
        }
    });
}, { fastify: '>=3.x' });