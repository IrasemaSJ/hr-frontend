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
      title="Successfully Purchased Cloud Server ECS!"
      subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
      extra={[
        <Button type="primary" key="Close" onClick={closeModal}>
          Close
        </Button>,
      ]}
    />
  );
};
