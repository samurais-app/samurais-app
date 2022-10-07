import styled from 'styled-components';
import { SelectBaseProps } from '../interface';
import { selectBgColor, selectBorder, selectBorderRadius, selectBorderSize } from './function';


export const SelectStyled = styled.div<SelectBaseProps>`
    box-sizing: border-box;
    width: 100%;
    background-color: ${selectBgColor};
    padding: 6px 8px;
    border-radius: ${selectBorderRadius}px;
    border: 1px solid ${selectBorder};
    transition: all 0.2s ease 0s;
    display: flex;
    flex-direction: row;
    position: relative;
    & input {
        font-size: ${selectBorderSize}px;
        line-height: ${selectBorderSize}px;
    }
    & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button {
        appearance: none;
    };
    & input::placeholder {
        color: #757575;
    };

    & input:focus {
        outline: none;
    };
`;

export const SelectInputStyled = styled.input`
    border: none;
    background-color: transparent;
    letter-spacing: 1px;
    appearance: textfield;
`;