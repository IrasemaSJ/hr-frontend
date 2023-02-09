import { Button, Result } from 'antd';
import React from 'react';

interface Props {
  prev?: () => void;
  closeModal?: () => void;
  folio: string;
}
export const LastStep = ({ closeModal, folio }: Props) => {
  const close = () => {
    closeModal!();
  };

  return (
    <Result
      status="success"
      title="Request Created Successfully"
      subTitle={`Your request folio is: ${folio}.`}
      extra={[
        <Button type="primary" key="Close" onClick={close}>
          Close
        </Button>,
      ]}
    />
  );
};
