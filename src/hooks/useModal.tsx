import React, { useState } from 'react';
import { Modal } from 'antd';
interface Props {
  children: JSX.Element;
}
export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const ModalWrapper = ({ children }: Props) => (
    <Modal open={isModalOpen} onCancel={closeModal} footer={[]}>
      {children}
    </Modal>
  );

  return {
    ModalWrapper,
    openModal,
    closeModal,
  };
};
