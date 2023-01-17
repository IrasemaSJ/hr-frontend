import { Button, Modal } from 'antd';
import React, { useState } from 'react';
import { Step, Stepper } from '../../components';
import { ContingencyForm } from '../../components/form/ContingencyForm';

export const Request = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1>Request</h1>
      <Button onClick={showModal}>Modal</Button>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={[]}>
        {/* <ContingencyForm /> */}
        <Stepper></Stepper>
      </Modal>
    </div>
  );
};
