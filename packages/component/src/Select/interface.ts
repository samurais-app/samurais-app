import { Strategy } from '@floating-ui/react-dom';
import { Size } from 'src/common/interface';
export interface Option {
    name: string;
    key: string| number;
    value: string | number | any;
}

export interface SelectBaseProps extends Pick<React.InputHTMLAttributes<HTMLInputElement>, 'placeholder'> {
    value?: any;
    options?: Option[];
    multiple?:boolean;
    size?: keyof typeof Size;
    error?: string;
}

export interface OptionBoxBaseProps extends Omit<React.InputHTMLAttributes<HTMLUListElement>, 'width' | 'position' | 'top' | 'left' | 'onChange'> {
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