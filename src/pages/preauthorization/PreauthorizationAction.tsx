import React from 'react';
import { Card, Typography, Divider, Form, Input, Button } from 'antd';
import { ReactComponent as Logo } from '../../assets/logo_improving.svg';

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
      </div>
    </Card>
  );
};

const onFinish = (values: any) => {
  alert(JSON.stringify(values));
};

const MyForm: React.FC = () => {
  const [form] = Form.useForm();

  // when declined, observations message is required
  const handleDecline = () => {
    form.setFieldsValue({ status: 'declined' });
    alert(JSON.stringify(form.getFieldsValue()));
  };

  // when approved, observations message is not required
  const handleAccept = () => {
    form.setFieldsValue({ status: 'approved' });
    alert(JSON.stringify(form.getFieldsValue()));
  };
  return (
    <Form
      form={form}
      layout="vertical"
      name="authorize"
      onFinish={onFinish}
      style={{ width: '100%', margin: '2rem' }}
    >
      <Form.Item name="observations" label="Observations" colon={true}>
        <Input.TextArea
          placeholder="Observations"
          style={{ height: 120, marginBottom: 24, resize: 'none' }}
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
  );
};
