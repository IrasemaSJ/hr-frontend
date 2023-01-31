import React, { useState } from 'react';
import { Modal } from 'antd';
interface Props {
  children: JSX.Element;
  width?: number;
}
export const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const ModalWrapper = ({ children, width }: Props) => (
    <Modal width={width} open={isModalOpen} onCancel={closeModal} footer={[]}>
      {children}
    </Modal>
  );

  return {
    ModalWrapper,
    openModal,
    closeModal,
  };
};
