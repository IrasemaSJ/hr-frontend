import { Modal } from 'antd';
import React from 'react';
import { Stepper } from '../request-step/Stepper';

interface Props {
  closeModal: () => void;
  width?: number;
  isModalOpen: boolean;
  onSuccess: () => void;
}
export const ModalOpenRequest = ({
  closeModal,
  width,
  isModalOpen,
  onSuccess,
}: Props) => {
  return (
    <Modal
      width={width}
      open={isModalOpen}
      onCancel={closeModal}
      footer={false}
      destroyOnClose
    >
      <Stepper closeModal={closeModal} refresh={onSuccess} />
    </Modal>
  );
};
