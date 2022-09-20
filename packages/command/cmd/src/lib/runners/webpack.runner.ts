import { Logger, AbstractRunner } from '@samurais-app/command-lib';
import webpack from 'webpack';
import Server from 'webpack-dev-server';
import { Config } from '../interfaces';

export enum LSOF_TABLE {
    COMMAND,
    PID,
    USER,
    FD,
    TYPE,
    DEVICE,
    'SIZE/OFF',
    NODE,
    NAME,
}

export enum LSOF_TABLE_TYPE {
    IPV4 = 'IPv4'
}
export class WebpackRunner extends AbstractRunner {
    constructor() { super('webpack'); }

    public build(config: Config): Promise<boolean> {
        return new Promise((reslove) => {
            webpack(config, (err, stats) => {
                if (err) { Logger.wran(`init -> ${err.message}`); reslove(false); };
                Logger.info(Object.entries(stats.compilation.assets).reduce((a, b) => {
                    return `${a}${b[0]}[${b[1].size()}]\n`;
                }, '资源列表\n'));
                reslove(true);
            });
        });
    }

    public async start(config: Config) {
        const { devServer, ...webpackConfig } = config;
        const server = new Server(devServer, webpack(webpackConfig, (err, stats) => {
            if (err) { Logger.wran(`init -> ${err.message}`); };
            Logger.info(Object.entries(stats.compilation.assets).reduce((a, b) => {
                return `${a}${b[0]}[${b[1].size()}]\n`;
            }, '资源列表\n'));
        }));
        ['SIGINT', 'SIGTERM'].forEach(function (sig) {
            process.on(sig, function () {
                server.close();
                process.exit();
            });
        });
        if (process.env.CI !== 'true') {
            process.stdin.on('end', function () {
                server.close();
                process.exit();
            });
        }
        return new Promise<boolean>((res) => {
            server.startCallback((err: any) => {
                if (err) Logger.error('启动失败');
                res(true);
            });
        });
    }

    // 根据类型获取机器下的node服务进程id组
    async getNodeProcess(type: LSOF_TABLE_TYPE) {
        return this.exec('lsof', ' -c node', true)
            .then((v: string) => {
                return v.split('\n');
            })
            .then((v) => {
                return v.map((d) => d.split(' ').filter(Boolean));
            })
            .then((data) => data.filter((d) => d[LSOF_TABLE.TYPE] === type))
            .then((data) => {
                return Array.from(new Set(data.map((da) => da[1])));
            });
    }

    async getProcessCommand(processId) {
        return this.exec(
            'ps',
            ' -o command -p ' + processId + ' | sed -n 2p',
            true,
        )
            .then((v: string) => v.replace(/\n/g, ''))
            .then((v) => v.split(' '));
    }

    // 获取启动中的进程信息
    async getStartNodeProcessAndName(processIds: string[]): Promise<{ name: string, id: string }[]> {
        return Promise.all((processIds.map((processId) => {
            return this.getProcessCommand(processId).then((v) => {
                if (!v[1].includes('bin/samurais') && v[2] !== 'start') return undefined;
                return { name: v[3], id: processId };
            });
        })))
            .then((v) => v.filter(Boolean))
            .catch(() => []);
    }

    async getStatrNodeProcessAndPort(processIds: string[]): Promise<{
        name: string;
        port: string;
    }[]> {
        const datas = await this.getStartNodeProcessAndName(processIds);
        return Promise.all(datas.map((dat) => {
            return this.getPortOfProcessById(dat.id).then((v) => {
                const portStr = v.split(' ').filter(Boolean);
                if (!portStr[8]) return undefined;
                return { name: dat.name, port: portStr[8].replace('*:', '') };
            });
        }))
            .then((v) => v.filter(Boolean))
            .catch(() => []);
    }

    async getPortOfProcessById(processId: string) {
        return this.exec('lsof', `-nP -p ${processId} | grep LISTEN`, true)
            .then((v: string) => v.replace(/\n/g, ''));
    }
}