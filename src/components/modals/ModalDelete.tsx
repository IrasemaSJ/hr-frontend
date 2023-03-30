import { Modal, Typography } from 'antd';
import { MyButton } from '../buttons/Buttons';

interface Props {
  deleteFunction: () => Promise<void>;
  message: JSX.Element;
  width?: number;
  isModalOpen: boolean;
  closeModal: () => void;
  action: 'Cancel' | 'Delete';
  headerName: string;
}

export const ModalDelete = ({
  deleteFunction,
  message,
  width,
  isModalOpen,
  closeModal,
  action,
  headerName,
}: Props) => {
  const actionLower = action.toLowerCase() as Lowercase<Props['action']>;
  return (
    <Modal width={width} open={isModalOpen} onCancel={closeModal} footer={[]}>
      <>
        <Typography.Title level={2}>
          {action} {headerName}
        </Typography.Title>
        <p>
          <Typography.Text>{message}</Typography.Text>
        </p>
        <div style={{ marginTop: '10px', textAlign: 'right' }}>
          <MyButton action={actionLower} onClick={() => deleteFunction()}>
            {action}
          </MyButton>
        </div>
      </>
    </Modal>
  );
};
