import React from 'react';
import { Form, Input, Button, Select, Check } from '@samurais-app/components';
import { LoginBoxStyled, LoginStyled } from './login.styled';



export default function Login() {
    const [form] = Form.useForm<{ account: any, password: any }>({
        onSubmit(data) {
            console.log(data);
        }
    });

    const v = Form.useWatch('select', form);
    const na = Form.useWatch('sdsd', form);
    const num = Form.useWatch('codenumber', form);
    console.log(v, na, num);
    return (
        <LoginStyled>
            <LoginBoxStyled>
                <Form form={form}>
                    <Form.Item name="select">
                        <Select placeholder="uyuqw">
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
                    <Form.Item name="sdsd">
                        <Check.Group>
                            <Check>测试选项</Check>
                            <Check>这是</Check>
                        </Check.Group>
                    </Form.Item>
                    <Form.Item name="account.code">
                        <Input type='text' placeholder="asds" size="middle" />
                    </Form.Item>
                    <Form.Item name="password.code">
                        <Input type='text' placeholder="asds111" size="middle" />
                    </Form.Item>
                    <Form.Item name="codenumber">
                        <Input type='number' placeholder="asds111ssd" size="middle"/>
                    </Form.Item>
                    <Button size='middle'>alshkksjdgasjh</Button>
                </Form>
            </LoginBoxStyled>
        </LoginStyled>
    );
}