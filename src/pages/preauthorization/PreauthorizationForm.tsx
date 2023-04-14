import { Button, Form, Input, Modal, Typography } from 'antd';
import React from 'react';
import { formatTableDate } from '../../helpers';

export const PreauthorizationForm: React.FC<{
  handleFinish: (values: any) => void;
  folio: string;
  dates: string[];
}> = ({ handleFinish, folio, dates }) => {
  const [form] = Form.useForm();
  const status = {
    positive: 'approved',
    negative: 'rejected',
  };
  const [modal, contextHolder] = Modal.useModal();

  // when declined, observations message is required
  const handleDecline = async () => {
    form.setFieldValue('status', status.negative);
    const values = { ...form.getFieldsValue(), status: status.negative };
    await form.validateFields();
    modal.confirm({
      title: 'Confirm Rejection',
      content: `Are you sure you want to reject this request?`,
      okText: 'Reject',
      okType: 'danger',
      onOk: () => {
        handleFinish({ ...values });
      },
    });
  };

  // when approved, observations message is not required
  const handleAccept = () => {
    const values = { ...form.getFieldsValue(), status: status.positive };
    modal.confirm({
      title: 'Confirm Approval',
      content: `Are you sure you want to approve this request?`,
      okText: 'Approve',
      onOk: () => {
        handleFinish({ ...values });
      },
    });
  };

  return (
    <>
      <Typography.Text>
        The request <b>{folio}</b> need your review
      </Typography.Text>
      <section className="list-with-heading">
        <ul>
          {dates.map((date, index) => (
            <li key={index}>{formatTableDate(date)}</li>
          ))}
        </ul>
      </section>
      <Form
        form={form}
        layout="vertical"
        name="authorize"
        style={{ width: '100%', margin: '2rem' }}
      >
        <Form.Item
          name="observations"
          label="Observations"
          colon={true}
          validateFirst={false}
          rules={[
            {
              /** observations is required when status is decline
               * Only onClick of
               *
               * Status is blanked when user focus on observations input
               */
              async validator(rule, value) {
                if (
                  form.getFieldValue('status') === status.negative &&
                  (!value || value.trim() === '')
                ) {
                  throw new Error(
                    "Please, for decline input the request's observations!",
                  );
                }
              },
            },
          ]}
        >
          <Input.TextArea
            placeholder="Observations"
            onFocus={() => {
              form.setFieldValue('status', '');
            }}
            style={{ height: 120, marginBottom: 24, resize: 'none', margin: 0 }}
          />
        </Form.Item>
        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-around' }}>
            <Button
              danger
              type="primary"
              htmlType="button"
              onClick={handleDecline}
            >
              Decline
            </Button>
            <Button
              type="primary"
              htmlType="button"
              onClick={() => {
                form.setFieldValue('status', '');
                handleAccept();
              }}
            >
              Authorize
            </Button>
          </div>
        </Form.Item>
      </Form>
      <Typography.Text type="secondary">
        For more information enter your panel in the system or check your email
        again.
      </Typography.Text>
      {contextHolder}
    </>
  );
};
