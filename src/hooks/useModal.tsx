import React, { useState } from 'react';
import { Modal } from 'antd';
interface Props {
  children: JSX.Element;
}
export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const UseModal = ({ children }: Props) => (
    <Modal width={1000} open={isModalOpen} onCancel={handleCancel} footer={[]}>
      {children}
    </Modal>
  );

  return {
    UseModal,
    showModal,
    handleCancel,
  };
};
