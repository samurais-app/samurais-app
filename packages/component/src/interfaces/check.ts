import { FieldProps, Size } from 'src/common/interfaces';
import { Theme } from 'src/theme';
import { ThemedStyledProps } from 'styled-components';


export interface CheckBaseProps extends FieldProps {
    [key:string]: any;
    active?: boolean;
    size: keyof typeof Size
}

export interface CheckGroupBaseProps extends FieldProps,Omit<React.InputHTMLAttributes<HTMLDivElement>, 'value' | 'onChange'> {
    multiple?: boolean
}

export type ThemeWithCheckBaseProps = ThemedStyledProps<CheckBaseProps,Theme>

export type ThemeWithCheckGroupBaseProps = ThemedStyledProps<CheckGroupBaseProps,Theme>