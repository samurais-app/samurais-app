import fastify from 'fastify';
import rate from '@fastify/rate-limit';
import cors from '@fastify/cors';
import blipp from 'fastify-blipp';
import { request, config, auth, web } from 'src/plugins';
import api from '@samurais-app/platform-api';
import prettifier from '@mgcrea/pino-pretty-compact';
import { IConfig } from '@samurais-app/platform-core';

export interface IOptions {
    config: IConfig;
    doc?: boolean
}

export function createServer(options: IOptions) {
    const { config: _config, doc } = options;
    const fastifyInstance = fastify({
        logger: {
            prettifier,
            transport: {
                target: 'pino-pretty',
                options: {
                    colorize: true
                }
            }
        },
        disableRequestLogging: true
    });
    fastifyInstance.register(config, _config);
    fastifyInstance.register(cors, {
        origin: `${_config.protocol}://${_config.host}`
    });
    fastifyInstance.register(rate, { max: 100, timeWindow: '1 minute' });
    fastifyInstance.register(auth);
    fastifyInstance.register(web);
    fastifyInstance.register(api, { prefix: '/api' });
    fastifyInstance.register(request);
    fastifyInstance.register(blipp);
    return fastifyInstance;
}
