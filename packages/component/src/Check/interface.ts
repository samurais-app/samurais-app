import { FieldProps, Size } from 'src/common/interfaces';


export interface CheckBaseProps extends FieldProps {
    multiple?:boolean;
    active?: boolean;
    size: keyof typeof Size
}