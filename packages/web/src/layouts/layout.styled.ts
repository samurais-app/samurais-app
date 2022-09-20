import styled from 'styled-components';

export interface ApplicationProps {
  top?: number
}

export const Application = styled.div<ApplicationProps>`
  width: 100vw;
  min-height: 100vh;
`;