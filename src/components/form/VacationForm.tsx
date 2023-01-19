import React from 'react';
import { Button, Checkbox, DatePicker, Form, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import './ContingencyForm.css';

const { Title } = Typography;
interface Foo {
  (): void;
}
interface Props {
  onSuccess?: Foo[];
  prev?: () => void;
}
export const VacationForm = ({ onSuccess, prev }: Props) => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
    onSuccess?.forEach((fun) => {
      fun();
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const disableWeekEnds = (current) => {
    return (
      new Date(current).getDay() === 0 || // sundays
      new Date(current).getDay() === 6 // saturdays
    );
  };

  return (
    <Form
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
    >
      <Title level={4}>Vacation</Title>

      <div className="contingency-form-row">
        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: 'Please enter a date!' }]}
        >
          <DatePicker
            style={{ width: '100%' }}
            format="DD/MM/YYYY"
            disabledDate={disableWeekEnds}
          />
        </Form.Item>

        <Form.Item label="Half Day" name="halfday" valuePropName="checked">
          <Checkbox />
        </Form.Item>
      </div>

      <Form.Item label="Message" name="message">
        <TextArea
          autoSize={{ minRows: 4, maxRows: 4 }}
          rows={4}
          placeholder="Write your comments here..."
        />
      </Form.Item>

      <Form.Item>
        {prev && (
          <Button type="primary" onClick={prev}>
            Previous
          </Button>
        )}
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
