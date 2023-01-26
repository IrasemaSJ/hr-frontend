import { Button, Result } from 'antd';
import React from 'react';

interface Props {
  prev?: () => void;
  closeModal?: () => void;
}
export const LastStep = ({ closeModal }: Props) => {
  return (
    <Result
      status="success"
      title="Request Created Successfully"
      subTitle="Your request folio ID: VAC-230126-02."
      extra={[
        <Button type="primary" key="Close" onClick={closeModal}>
          Close
        </Button>,
      ]}
    />
  );
};
