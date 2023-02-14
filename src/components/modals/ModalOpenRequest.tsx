import { Modal } from 'antd';
import React from 'react';
import { CreateContingencyForm } from '../form/interfaces';
import { Stepper } from '../request-step/Stepper';

interface Props {
  closeModal: () => void;
  width?: number;
  isModalOpen: boolean;
  createContingency: (data: CreateContingencyForm) => void;
  folio: string;
  disabledDates: string[];
  contingenciesCount: number;
}
export const ModalOpenRequest = ({
  closeModal,
  width,
  isModalOpen,
  createContingency,
  folio,
  disabledDates,
  contingenciesCount,
}: Props) => {
  return (
    <Modal
      width={width}
      open={isModalOpen}
      onCancel={closeModal}
      footer={false}
      destroyOnClose
    >
      <Stepper
        closeModal={closeModal}
        createContingency={createContingency}
        folio={folio}
        disabledDates={disabledDates}
        contingenciesCount={contingenciesCount}
      />
    </Modal>
  );
};
