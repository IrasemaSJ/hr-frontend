import { Button, Result } from 'antd';
import React from 'react';

interface Props {
  prev?: () => void;
  closeModal?: () => void;
  folio: string;
  refresh: () => void;
}
export const LastStep = ({ closeModal, folio, refresh }: Props) => {
  const close = () => {
    closeModal!();
    setTimeout(() => {
      refresh();
    }, 100);
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
