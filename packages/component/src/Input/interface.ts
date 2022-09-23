import { Size } from 'src/common/interface';

export type InputType = 'text' | 'number' | 'password'

export interface InputBaseProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
    type?: InputType;
    size?: keyof typeof Size;
    error?: string;
}