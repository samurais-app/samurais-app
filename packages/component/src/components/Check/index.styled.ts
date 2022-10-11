import styled from 'styled-components';
import { checkActiveColor, checkBgColor, checkBorder, checkBorderRadius, checkSize, checkTextSpacing } from 'src/foundation';


export const CheckBoxContainer = styled.div<any>`
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
`;

export const CheckBox = styled.b`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${checkSize}px;
    height: ${checkSize}px;
    background-color: ${checkBgColor};
    border-radius: ${checkBorderRadius}px;
    border: 1px solid ${checkBorder};
    transition: all 0.2s ease 0s;
    padding: 2px;
    &::after {
        display: inline-block;
        content: '';
        width: ${props => props.active ? '100%' : '0%'};
        height:${props => props.active ? '100%' : '0%'};
        background-color: ${checkActiveColor};
        transition: all 0.2s ease 0s;
        border-radius: ${checkBorderRadius}px;
    }
`;

export const CheckText = styled.span`
    display: inline-block;
    margin-left: ${checkTextSpacing}px;
`;