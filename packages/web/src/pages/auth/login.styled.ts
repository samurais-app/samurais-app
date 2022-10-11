import styled from 'styled-components';

export type LoginStyledProps = {
  backgroundImage?: string
}

export const LoginStyled = styled.div<LoginStyledProps>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-image: ${(props) => props.backgroundImage ? props.backgroundImage : ''};
`;

export const LoginBoxStyled = styled.div`
  width: 40rem;
  padding: 12px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 2px #dddddd52;
  display: flex;
  flex-direction: row;
  & > form {
    width: 100%;
  }
`;