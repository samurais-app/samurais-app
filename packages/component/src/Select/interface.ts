import { Strategy } from '@floating-ui/react-dom';
import { FieldProps, Size } from 'src/common/interfaces';
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

export interface OptionBoxBaseProps extends Omit<React.InputHTMLAttributes<HTMLDivElement>, 'width' | 'position' | 'top' | 'left' | 'onChange'> {
    show?: boolean;
    value?: string | number;
    width: number;
    position: Strategy;
    top: number;
    left: number;
}


export interface OptionBaseProps {
    isActive?: boolean;
    key?: any;
    value: string | number;
}