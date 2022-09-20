import { Input } from 'src/commands';
import { AbstractAction } from './abstract.action';


export class LoginAction extends AbstractAction {
    public async handle(inputs?: Input[], options?: Input[], extraFlags?: string[]): Promise<void> {
        const account = options.find((opt) => opt.name === 'account')!.value;
        const password = options.find((opt) => opt.name === 'password')!.value;
    }
}