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
                    <Form.Item name="select">
                        <Select placeholder="uyuqw" value={val}>
                            <Select.Option value="1">测试</Select.Option>
                            <Select.Option value="2">测试1</Select.Option>
                            <Select.Option value="3">测试2</Select.Option>
                            <Select.Option value="4">asd</Select.Option>
                            <Select.Option value="5">sdfdf</Select.Option>
                            <Select.Option value="6">asd</Select.Option>
                            <Select.Option value="7">vsdsd</Select.Option>
                            <Select.Option value="8">ljoiy</Select.Option>
                        </Select>
                    </Form.Item>
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