export type InputType = 'text' | 'number' | 'password'

export enum InputSize {
    small = 0,
    middle = 1,
    large = 2
}

export interface InputBaseProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type'> {
    type?: InputType;
    size?: keyof typeof InputSize;
    error?: string;
}