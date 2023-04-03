import { Button, Form, Input, Select } from 'antd';
import React from 'react';
import type { SelectProps } from 'antd';
import { role_project } from './interfaces/preauthorization';

export const PreauthorizationForm = ({
  handleSubmit,
}: {
  handleSubmit: (values: { name: string }) => void;
}) => {
  const [formCreate] = Form.useForm();

  // key value relationship for select input
  const options: SelectProps['options'] = [];
  for (const [key, value] of Object.entries(role_project)) {
    options.push({ label: value, value: key });
  }

  return (
    <Form
      form={formCreate}
      name="preauthorization"
      layout="vertical"
      onFinish={(values) => {
        handleSubmit({ ...values });
        formCreate.resetFields();
      }}
    >
      <Form.Item
        name="email_responsible"
        label="Authorizator email"
        rules={[
          { type: 'email', message: 'Not a valid email' },
          { required: true },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="Position"
        style={{ flex: 1 }}
        name="project_role"
        rules={[{ required: true }]}
      >
        <Select placeholder="Position" options={options} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add
        </Button>
      </Form.Item>
    </Form>
  );
};
