import { Button, Form, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';
import { useModal } from '../../hooks';
import { BtnTable } from '../buttons/Buttons';

export const RejectActionButton = () => {
  const { ModalWrapper, closeModal, openModal } = useModal();
  return (
    <>
      <BtnTable action="reject" onClick={openModal} />
      <ModalWrapper>
        <>
          <Typography.Title level={2}>Reject Contingency</Typography.Title>
          <Typography.Text>
            Are you sure to reject the contingency <b>CON-230509-01</b>?
          </Typography.Text>
          <Form layout="vertical">
            <Form.Item
              label="Observations"
              name="observations"
              rules={[
                { required: true, message: 'Please input your username!' },
              ]}
            >
              <TextArea
                autoSize={{ minRows: 4, maxRows: 4 }}
                rows={4}
                placeholder="Write your comments here..."
              />
            </Form.Item>
            <Form.Item style={{ textAlign: 'right' }}>
              <Button
                type="primary"
                danger
                htmlType="submit"
                onClick={closeModal}
              >
                Reject
              </Button>
            </Form.Item>
          </Form>
        </>
      </ModalWrapper>
    </>
  );
};
