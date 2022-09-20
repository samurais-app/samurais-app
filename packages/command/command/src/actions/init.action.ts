import { Input } from 'src/commands';
import { Configuration } from 'src/lib/configuration';
import { Environment } from '@samurais-app/lib';
import { AbstractAction } from './abstract.action';


export class InitAction extends AbstractAction {
    public async handle(inputs?: Input[], options?: Input[], extraFlags?: string[]): Promise<void> {
        const config = new Configuration();
        config.env = options.find((opt) => opt.name === 'env').value as Environment;
        config.create();
    }
}