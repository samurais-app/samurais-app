import { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';
import compress from '@fastify/compress';
import filesstatic from '@fastify/static';
import { join } from 'path';
import { AbstractWebPlugin, Plugin } from '@samurais-app/platform-core';
import { template } from './template';

export default fp(async function (instance: FastifyInstance) {
    const plugin = instance.config.getPlugin(Plugin.WEB) as AbstractWebPlugin;
    const { root, prefix, assets, login,filter } = plugin.getOptions();
    const files: string[] = Object.values(require(join(root, assets)));

    function filterUri(_uri: string) {
        return [...filter].some((uri) => !_uri.startsWith(uri));
    }

    instance.route({
        method: ['GET'], url: '/*', handler: (req, res) => {
            if (filterUri(req.url) && req.session && !req.session.get('user')) {
                res.header('Content-Type', 'text/html');
                res.redirect(login);
            } else {
                res.header('Content-Type', 'text/html');
                res.code(200).send(template(files));
            };
        }
    });
    instance.register(compress, {
        requestEncodings: ['gzip']
    });
    instance.register(filesstatic, {
        root,
        prefix,
        etag: true,
        lastModified: true,
        immutable: true,
        cacheControl: true,
        preCompressed: true
    });
}, { fastify: '>=3.x', dependencies: ['config'] });
