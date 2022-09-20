import React from 'react';
import styled from 'styled-components';
import { Input } from 'src/components';
import { FormData, Values } from 'src/interfaces';

type AuthFormProps<V = Values> = {
  data: FormData<V>;
  children: JSX.Element | JSX.Element[]
}

const AuthFormStyled = styled.div`
  flex: 1;
  padding: 24px;
  box-sizing: border-box;
`;

const Form = styled.form``;

export function AuthForm<V extends Values>(props: AuthFormProps<V>) {
    return (
        <AuthFormStyled>
            <Form onSubmit={(e) => {
                e.preventDefault();
                props.data.handleSubmit(e);
            }}>
                <Input name="account" onChange={props.data.handleChange} value={props.data.values.account} />
                {props.children}
            </Form>
        </AuthFormStyled>
    );
}