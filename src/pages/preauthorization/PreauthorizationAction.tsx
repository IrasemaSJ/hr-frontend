import React from 'react';
import {
  Card,
  Typography,
  Divider,
  Form,
  Input,
  Button,
  Modal,
  Spin,
  Result,
} from 'antd';
import { ReactComponent as Logo } from '../../assets/logo_improving.svg';
import { useSearchParams } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import ApiHR from '../../api/ApiHR';

//simulacion de manejador de peticiones
function apiReqest(body: any, delay: number) {
  return new Promise(function (_resolve, _reject) {
    setTimeout(() => {
      // _resolve({ statusCode: 200, ...body });
      _reject({ statusCode: 500, ...body });
    }, delay);
  });
}
interface TokenInterface {
  dates: string[];
  email_responsible: string;
  exp: number;
  folio: string;
  iat: number;
  id_request: string;
  requestType: string;
}
export const PreauthorizationAction = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = React.useState(false);
  const [result, setResult] = React.useState<any>();

  // check if it exists a token
  const token = searchParams.get('hash');
  if (!token) return <div>Token not found</div>;

  // check if it is a valid token in syntax
  const decoded: TokenInterface = jwt_decode(token);
  const { folio, requestType, id_request, email_responsible } = decoded;
  if (!folio) return <div>Folio not found</div>;

  const handleFinish = async (values: {
    observations: string;
    status: string;
  }) => {
    setIsLoading(true);
    try {
      const postBody = {
        ...values,
        folio,
        requestType,
        token,
      };
      const response = await ApiHR.patch(`/preauthorizations/${id_request}`, {
        email: email_responsible,
        status: values.status,
        observations: values.observations,
        token,
        requestType,
      });

      console.log(response);
      setResult({ ...postBody, message: response });
    } catch (error) {
      console.log(error);
      setResult(error);
    }
    setIsLoading(false);
  };

  const handlerClose = () => {
    window.opener = null;
    window.open('', '_self');
    window.close();
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Spin spinning={isLoading} style={{ width: '100%' }}>
        <Card
          style={{
            margin: '10 auto',
            maxWidth: '600px',
            minWidth: '90%',
          }}
        >
          <div
            style={{
              width: 'auto',
              display: 'flex',
              flexDirection: 'column',
              margin: 'auto',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Logo />
            <Typography.Title
              type="secondary"
              level={5}
              style={{ marginTop: 25 }}
            >
              {requestType} Request
            </Typography.Title>
            <Divider />
            {!result ? (
              <MyForm handleFinish={handleFinish} folio={folio} />
            ) : (
              <>
                <Result
                  status={result.statusCode <= 300 ? 'success' : 'error'}
                  title={
                    result.statusCode <= 300
                      ? 'Successfully Submitted!'
                      : 'Submission Failed'
                  }
                  subTitle={
                    result.statusCode <= 300 ? (
                      <>
                        <Typography.Text>
                          Request {result.folio} has been {result.status}
                        </Typography.Text>
                        <Typography.Paragraph>
                          Observations: {result.observations || 'None'}
                        </Typography.Paragraph>
                      </>
                    ) : (
                      <Typography.Paragraph>
                        Something went wrong, please try again later
                      </Typography.Paragraph>
                    )
                  }
                />
                <Button type="primary" key="button" onClick={handlerClose}>
                  Close
                </Button>
              </>
            )}
          </div>
        </Card>
      </Spin>
    </div>
  );
};

const MyForm: React.FC<{
  handleFinish: (values: any) => void;
  folio: string;
}> = ({ handleFinish, folio }) => {
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
