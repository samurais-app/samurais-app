import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Select } from '@samurais-app/components';
import { LoginBoxStyled, LoginStyled } from './login.styled';



export default function Login() {
    const [form] = Form.useForm<{ account: any, password: any }>({
        onSubmit(data) {
            console.log(data);
        }
    });
    const [val, setVal] = useState('');
    useEffect(() => {
        // const account = form.getContext('account');
        // account.addEventListener('dependent', function () {
        //     this.field.value = '12312aaa';
        // });
    }, []);
    console.log();
    return (
        <LoginStyled>
            <LoginBoxStyled>
                <Form form={form}>
                    <Select placeholder="uyuqw" value={val} onChange={(e) => { setVal(e); }}>
                        <Select.Option value="1">1</Select.Option>
                        <Select.Option value="2">2</Select.Option>
                    </Select>
                    <Form.Item name="account.code">
                        <Input type='text' placeholder="asds" size="middle" />
                    </Form.Item>
                    <Form.Item name="password.code">
                        <Input type='text' placeholder="asds111" size="middle" />
                    </Form.Item>
                    <Form.Item name="codenumber">
                        <Input type='number' placeholder="asds111ssd" size="middle" onChange={(e) => {
                            console.log(e);
                        }} />
                    </Form.Item>
                    <Button size='small'>alshkksjdgasjh</Button>
                </Form>
            </LoginBoxStyled>
        </LoginStyled>
    );
}