import styled from 'styled-components';
import { checkGroupItemMargin } from 'src/foundation';


export const CheckGroupStyled = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: nowrap;

    & > div {
        margin-right: ${checkGroupItemMargin}px;
    }
    & > div:last-child {
        margin-right: unset;
    }
`;