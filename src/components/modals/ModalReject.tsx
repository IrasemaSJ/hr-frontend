import { Button, Form, Modal, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';

interface Props {
  changeStatus: (data: { observations: string }) => void;
  folio: string;
  width?: number;
  isModalOpen: boolean;
  closeModal: () => void;
}

export const ModalReject = ({
  changeStatus,
  folio,
  width,
  isModalOpen,
  closeModal,
}: Props) => {
  return (
    <Modal
      width={width}
      open={isModalOpen}
      onCancel={closeModal}
      footer={false}
      destroyOnClose
    >
      <>
        <Typography.Title level={2}>Reject Contingency</Typography.Title>
        <Typography.Text>
          Are you sure to reject the contingency <b>{folio}</b>?
        </Typography.Text>
        <Form
          layout="vertical"
          initialValues={{ observations: '' }}
          onFinish={changeStatus}
        >
          <Form.Item
            label="Observations"
            name="observations"
            rules={[
              { required: true, message: 'Please input the observations!' },
            ]}
          >
            <TextArea
              autoSize={{ minRows: 4, maxRows: 4 }}
              rows={4}
              placeholder="Write your comments here..."
            />
          </Form.Item>
          <Form.Item style={{ textAlign: 'right' }}>
            <Button type="primary" danger htmlType="submit">
              Reject
            </Button>
          </Form.Item>
        </Form>
      </>
    </Modal>
  );
};
