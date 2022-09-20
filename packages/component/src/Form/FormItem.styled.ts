import { FieldProps } from 'src/common/interface';
import styled from 'styled-components';


export const FormItemStyled = styled.div<FieldProps>`
    position: relative;
    padding-bottom: 14px;
    &:before {
        content: "${(props) => props.error}";
        display: block;
        position: absolute;
        z-index: 100;
        font-size: 12px;
        line-height: 12px;
        bottom: 0px;
        left: 0px;
        color: ${(props) => props.error ? '#fb1f6a' : 'transparent'};
    }
`;