export interface FieldProps {
    value?: any;
    error?: string;
    onChange?:(event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  }