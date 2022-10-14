import { Strategy } from '@floating-ui/react-dom';
import { ThemedStyledProps } from 'styled-components';
import { FieldProps, Size } from 'src/common/interfaces';
import { Theme } from 'src/theme';
export interface Option {
    name: string;
    key?: string| number;
    value: string | number | any;
}

export interface SearchParams {
    page?: number;
    size?: number;
    search?: string;
};

export interface SelectBaseProps extends Pick<React.InputHTMLAttributes<HTMLInputElement>, 'placeholder'>, FieldProps {
    options?: Option[];
    multiple?:boolean;
    size?: keyof typeof Size;
    error?: string;
    fetch?:(params:SearchParams) => Promise<Option[]>
}

export interface OptionBoxBaseProps extends Omit<React.InputHTMLAttributes<HTMLDivElement>, 'size'| 'width' | 'position' | 'top' | 'left' | 'onChange'> {
    show?: boolean;
    value?: string | number;
    width: number;
    position: Strategy;
    top: number;
    left: number;
    size?: keyof typeof Size;
}


export interface OptionBaseProps {
    size?: keyof typeof Size;
    isActive?: boolean;
    key?: any;
    value: string | number;
}

export type ThemeWithSelectBaseProps = ThemedStyledProps<SelectBaseProps,Theme>;

export type ThemeWithOptionBaseProps = ThemedStyledProps<OptionBaseProps,Theme>;

export type ThemeWithOptionBoxBaseProps = ThemedStyledProps<OptionBoxBaseProps,Theme>;