import React, { useState } from 'react';
import { Card, Typography, Divider, Form, Input, Button, Modal } from 'antd';
import { ReactComponent as Logo } from '../../assets/logo_improving.svg';
import { ExclamationCircleOutlined } from '@ant-design/icons';

// request/preauthorization/asdfasdf
// {
//   "email_responsable": "1aaf94e0-d240-11ed-8702-c476f438172b",
//   "folio": "20f70f40-d240-11ed-968d-72cf8fe377af",
//   "id_request": "642c84997ccf14ddefee8d42",
//   "requestType": "Contingency",
//   "observations": "2021-08-01T00:00:00.000Z",
//   "status": "reject" || "approve"",
// }

export const PreauthorizationAction = () => {
  return (
    <Card
      style={{
        margin: '10 auto',
        maxWidth: '600px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: 'auto',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Logo />
        <Typography.Title type="secondary" level={4}>
          Contingency Request
        </Typography.Title>
        <Divider />
        <Typography.Text>
          The request <b>CON-072022-01</b> need your review
        </Typography.Text>
        <MyForm />
        <Typography.Text>
          For more information enter your panel in the system or check your
          email again
        </Typography.Text>
      </div>
    </Card>
  );
};

const onFinish = (values: any) => {
  alert(JSON.stringify(values));
};

const MyForm: React.FC = () => {
  const [form] = Form.useForm();
  const [modal, contextHolder] = Modal.useModal();
  const status = {
    positive: 'approved',
    negative: 'decline',
  };

  // when declined, observations message is required
  const handleDecline = async () => {
    form.setFieldValue('status', status.negative);
    const values = { ...form.getFieldsValue(), status: status.negative };
    await form.validateFields();
    console.log(values);
    modal.confirm({
      title: 'Confirm',
      content: `Are you sure you want to ${status.negative} this request?`,
      okText: 'Approve',
      onOk: () => {
        console.log(values);
      },
    });
  };

  // when approved, observations message is not required
  const handleAccept = () => {
    const values = { ...form.getFieldsValue(), status: status.positive };
    modal.confirm({
      title: 'Confirm',
      content: `Are you sure you want to ${status.positive} this request?`,
      okText: 'Approve',
      onOk: () => {
        console.log(values);
      },
    });
  };

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        layout="vertical"
        name="authorize"
        onFinish={onFinish}
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
                  !value
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
            <Button type="primary" htmlType="button" onClick={handleAccept}>
              Authorize
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};
