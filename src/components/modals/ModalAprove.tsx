import { Button, Modal, Typography } from 'antd';

interface Props {
  changeStatus: (data?: { observations: string }) => void;
  folio: string;
  width?: number;
  isModalOpen: boolean;
  closeModal: () => void;
}

export const ModalAprove = ({
  changeStatus,
  folio,
  width,
  isModalOpen,
  closeModal,
}: Props) => {
  return (
    <Modal width={width} open={isModalOpen} onCancel={closeModal} footer={[]}>
      <>
        <Typography.Title level={2}>Aprove Contingency</Typography.Title>
        <p>
          <Typography.Text>
            Are you sure to aprove the contingency <b>{folio}</b>?
          </Typography.Text>
        </p>
        <div style={{ marginTop: '10px', textAlign: 'right' }}>
          <Button
            type="primary"
            style={{ backgroundColor: 'green' }}
            onClick={() => changeStatus()}
          >
            Aprove
          </Button>
        </div>
      </>
    </Modal>
  );
};
