export interface Option {
    name: string;
    key: string| number;
    value: string | number | any;
}

export interface SelectBaseProps {
    options: Option[];
    multiple?:boolean;
}