import styled from 'styled-components';
import { avatarBorderRadius, avatarSize, avatarTextMarginLeft } from 'src/foundation';
import { ThemeWithAvatarBaseProps } from 'src/interfaces';


export const AvatarStyled = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

export const AvatarContainerStyled = styled.div<ThemeWithAvatarBaseProps>`
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