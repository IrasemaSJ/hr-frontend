import React from 'react';
import { Button, Checkbox, DatePicker, Form, Typography } from 'antd';
import './ContingencyForm.css';
import { InputDate, InputMessage } from '../inputs';

const { Title } = Typography;
interface Foo {
  (): void;
}
interface Props {
  onSuccess?: Foo[];
  prev?: () => void;
  title: string;
}
export const VacationForm = ({ onSuccess, prev, title }: Props) => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
    onSuccess?.forEach((fun) => {
      fun();
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
    >
      <Title level={4}>{title}</Title>

      <InputDate />

      {/* <InputMessage /> */}

      <Form.Item>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {prev && (
            <Button type="default" onClick={prev}>
              Previous
            </Button>
          )}
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </div>
      </Form.Item>
    </Form>
  );
};
