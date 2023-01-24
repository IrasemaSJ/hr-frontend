import { Form } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';

interface Props {
  minRows?: number;
  maxRows?: number;
}
export const InputMessage = ({ minRows = 4, maxRows = 4 }: Props) => {
  return (
    <Form.Item label="Message" name="message">
      <TextArea
        autoSize={{ minRows, maxRows }}
        rows={4}
        placeholder="Write your comments here..."
      />
    </Form.Item>
  );
};
