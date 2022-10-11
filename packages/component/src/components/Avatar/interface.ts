

export interface AvatarBaseProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string;
    size?: number;
    circular?: boolean;
    ellipsis?: boolean;
}