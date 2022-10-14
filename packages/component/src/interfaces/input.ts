import { FieldProps, Size } from 'src/common/interfaces';
import { Theme } from 'src/theme';
import { ThemedStyledProps } from 'styled-components';

export type InputType = 'text' | 'number' | 'password'

export interface InputBaseProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'type' | 'value' | 'onChange'>, FieldProps {
    type?: InputType;
    size?: keyof typeof Size;
}

export type ThemeWithInputBaseProps = ThemedStyledProps<InputBaseProps,Theme>;