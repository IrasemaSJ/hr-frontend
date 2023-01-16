import React from 'react';
import { Button, Checkbox, DatePicker, Form, Input } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import './Contingency.css';
import FormItemLabel from 'antd/es/form/FormItemLabel';

export const Contingency: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const [form] = Form.useForm();

  return (
    <Form
      name="basic"
      form={form}
      //   labelCol={{ span: 8 }}
      //   wrapperCol={{ span: 16 }}
      //   initialValues={{ remember: true }}
      //   onFinish={onFinish}
      //   onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
    >
      <div className="horizontal">
        <Form.Item
          label="Date"
          name="date"
          // rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <DatePicker onChange={console.log} />
        </Form.Item>

        <Form.Item
          label="Half Day"
          name="halfday"
          valuePropName="checked"
          //   wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox></Checkbox>
        </Form.Item>
      </div>

      <Form.Item
        // label="Password"
        name="message"
        // rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <TextArea rows={4} placeholder="Write your comments here..." />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
