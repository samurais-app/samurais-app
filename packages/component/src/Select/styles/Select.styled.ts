import styled from 'styled-components';
import { selectBorder, selectBorderRadius, selectBorderSize } from './function';


export const SelectStyled = styled.div`
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
    font-size: ${selectBorderSize}px;
`;