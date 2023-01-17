import { Button } from 'antd';
import React from 'react';
import { Stepper } from '../../components';
import { useModal } from '../../hooks';

export const Request = () => {
  const { UseModal, showModal, handleCancel } = useModal();
  return (
    <div>
      <h1>Request</h1>
      <Button onClick={showModal}>Modal</Button>
      <UseModal>
        <Stepper closeModal={handleCancel} />
      </UseModal>
    </div>
  );
};
