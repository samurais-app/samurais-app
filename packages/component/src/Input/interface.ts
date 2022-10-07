import { FieldProps, Size } from 'src/common/interfaces';

export type InputType = 'text' | 'number' | 'password'

export interface InputBaseProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'value' | 'onChange'>, FieldProps {
    type?: InputType;
    size?: keyof typeof Size;
}