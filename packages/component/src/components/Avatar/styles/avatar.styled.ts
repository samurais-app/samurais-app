import { Theme } from 'src/theme';
import styled, { ThemedStyledProps } from 'styled-components';
import { AvatarBaseProps } from '../interface';
import { avatarBorderRadius, avatarSize, avatarTextMarginLeft } from './function';


export const AvatarStyled = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

export const AvatarContainerStyled = styled.div<ThemedStyledProps<Pick<AvatarBaseProps, 'circular' | 'size'>, Theme>>`
    width: ${avatarSize};
    height: ${avatarSize};
    border-radius: ${avatarBorderRadius};
    overflow: hidden;
`;

export const AvatarImageStyled = styled.img`
    width: 100%;
    height: 100%;
    vertical-align: bottom;
`;

export const AvatarTextStyled = styled.span`
    display: inline-block;
    margin-left: ${avatarTextMarginLeft};
`;