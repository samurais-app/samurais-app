import { Size } from 'src/common/interfaces';

export enum borderRadiusSize {
    small = 14,
    middle = 18,
    large = 24
}

export interface ButtonBaseProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: keyof typeof Size;
}