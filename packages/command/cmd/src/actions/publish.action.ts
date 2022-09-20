import { Input } from 'src/commands';
import { AbstractAction } from './abstract.action';

export class PublishAction extends AbstractAction {
    public async handle(inputs?: Input[], options?: Input[], extraFlags?: string[]): Promise<void> {

        console.log();
    }

}