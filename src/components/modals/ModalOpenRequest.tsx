import { Modal } from 'antd';
import React from 'react';
import { SubmitValues } from '../../pages/employees/EmployeeInfo';
import { Stepper } from '../request-step/Stepper';

interface Props {
  closeModal: () => void;
  width?: number;
  isModalOpen: boolean;
  createContingency: (data: SubmitValues) => void;
  folio: string;
}
export const ModalOpenRequest = ({
  closeModal,
  width,
  isModalOpen,
  createContingency,
  folio,
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
      />
    </Modal>
  );
};
