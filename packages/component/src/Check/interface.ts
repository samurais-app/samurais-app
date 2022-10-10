import { FieldProps, Size } from 'src/common/interfaces';


export interface CheckBaseProps extends FieldProps {
    [key:string]: any;
    active?: boolean;
    size: keyof typeof Size
}

export interface CheckGroupBaseProps extends FieldProps,Omit<React.InputHTMLAttributes<HTMLDivElement>, 'value' | 'onChange'> {
    multiple?: boolean
}