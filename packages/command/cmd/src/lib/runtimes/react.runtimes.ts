
import { Cache, Plugin, Rule } from '../interfaces';
import MiniCssExtractPlugins from 'mini-css-extract-plugin';
import { WebpackRunner } from '../runners';
import { AbstractRuntime } from './abstract.runtimes';
import { RuntimeType } from './runtimes';


export class ReactRuntime extends AbstractRuntime {
    constructor(runner: WebpackRunner) { super(RuntimeType.REACT, runner); }
    protected cache(): Cache {
        return false;
    }
    protected rules(): Rule[] {
        return [
            {
                test: /\.less$/, // 查找所有less文件
                exclude: /node_modules/,
                use: [{ loader: MiniCssExtractPlugins.loader, options: { publicPath: '../' } }, { loader: this.findLocalModule('css-loader') }, { loader: this.findLocalModule('less-loader') }]
            }
        ];
    }
    protected plugins(): Plugin[] {
        return [
            new MiniCssExtractPlugins({
                filename: 'css/[chunkhash:8].css',
            }),
        ];
    }

}