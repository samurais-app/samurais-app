import styled from 'styled-components';
import { SelectBaseProps } from '../interface';
import { selectBorder, selectBorderRadius, selectBorderSize } from './function';


export const SelectStyled = styled.div<SelectBaseProps>`
    box-sizing: border-box;
    width: 100%;
    background-color: #f6f6f6;
    padding: 6px 8px;
    border-radius: ${selectBorderRadius}px;
    border: 1px solid ${selectBorder};
    transition: all 0.2s ease 0s;
    display: flex;
    flex-direction: row;
    position: relative;
    & input {
        border: none;
        background-color: transparent;
        letter-spacing: 1px;
        appearance: textfield;
        font-size: ${selectBorderSize}px;
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

export const SelectInputStyled = styled.input``;