import { Input } from 'src/commands';

export abstract class AbstractAction {

  public abstract handle(
    inputs?: Input[],
    options?: Input[],
    extraFlags?: string[],
  ): Promise<void>;
}