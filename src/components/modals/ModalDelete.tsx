import { Button, Modal, Typography } from 'antd';

interface Props {
  deleteContingecy: () => void;
  folio: string;
  width?: number;
  isModalOpen: boolean;
  closeModal: () => void;
  action: 'Cancel' | 'Delete';
}

export const ModalDelete = ({
  deleteContingecy,
  folio,
  width,
  isModalOpen,
  closeModal,
  action,
}: Props) => {
  return (
    <Modal width={width} open={isModalOpen} onCancel={closeModal} footer={[]}>
      <>
        <Typography.Title level={2}>{action} Contingency</Typography.Title>
        <p>
          <Typography.Text>
            Are you sure to {action.toLowerCase()} the contingency{' '}
            <b>{folio}</b>?
          </Typography.Text>
        </p>
        <div style={{ marginTop: '10px', textAlign: 'right' }}>
          <Button type="primary" danger onClick={() => deleteContingecy()}>
            Delete
          </Button>
        </div>
      </>
    </Modal>
  );
};
