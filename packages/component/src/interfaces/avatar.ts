import { ThemedStyledProps } from 'styled-components';
import { Theme } from 'src/theme';


export interface AvatarBaseProps extends React.HTMLAttributes<HTMLDivElement> {
    src?: string;
    size?: number;
    circular?: boolean;
    ellipsis?: boolean;
}

export type ThemeWithAvatarBaseProps = ThemedStyledProps<Pick<AvatarBaseProps, 'circular' | 'size'>, Theme>