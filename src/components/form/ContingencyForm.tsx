import React, { useContext, useState } from 'react';
import {
  Button,
  Checkbox,
  DatePicker,
  Form,
  notification,
  Typography,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import './ContingencyForm.css';
import * as dayjs from 'dayjs';
import ApiHR from '../../api/ApiHR';
import { AuthContext } from '../../contexts/AuthContext';
import { NotificationPlacement } from 'antd/es/notification/interface';
import { handleErrorHttp } from '../../helpers';
import { Loader } from '../loader/Loader';

const { Title } = Typography;
interface Foo {
  (): void;
}
interface Props {
  onSuccess?: Foo[];
  prev?: () => void;
  setFolio?: React.Dispatch<React.SetStateAction<string>>;
}

interface SubmitValues {
  date: dayjs.Dayjs;
  half_day?: boolean;
  comments?: string;
}
export const ContingencyForm = ({ onSuccess, prev, setFolio }: Props) => {
  const { logOut } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // notification
  const [api, contextHolder] = notification.useNotification();
  const openNotification = (
    placement: NotificationPlacement,
    messages: string | string[],
  ) => {
    api.error({
      message: `Oops! Something went wrong!`,
      description: (
        <ul>
          {Array.isArray(messages) ? (
            messages.map((msg) => <li key={msg}>{msg}</li>)
          ) : (
            <li>{messages}</li>
          )}
        </ul>
      ),
      placement,
    });
  };
  // notification

  const onSubmit = async ({ date, half_day, comments }: SubmitValues) => {
    try {
      const submitValues = {
        half_day,
        comments,
        date: date.format('YYYY-MM-DD'),
      };

      setIsLoading(true);
      const res = await ApiHR.post('/contingencies', submitValues);
      if (setFolio !== undefined) {
        setFolio(res.data.folio);
      }
      setIsLoading(false);
      onSuccess?.forEach((fun) => {
        fun();
      });
    } catch (err: any) {
      setIsLoading(false);
      handleErrorHttp({ error: err, openNotification, logOut });
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const disableWeekEnds = (current: dayjs.Dayjs) => {
    return (
      new Date(current.toString()).getDay() === 0 || // sundays
      new Date(current.toString()).getDay() === 6 // saturdays
    );
  };

  return (
    <>
      <Loader show={isLoading} />

      <Form
        name="basic"
        onFinish={onSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        {contextHolder}
        <Title level={4}>Contingency</Title>

        <div className="contingency-form-row">
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: 'Please enter a date!' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              format="DD/MM/YYYY"
              disabledDate={disableWeekEnds}
            />
          </Form.Item>

          <Form.Item label="Half Day" name="half_day" valuePropName="checked">
            <Checkbox />
          </Form.Item>
        </div>

        <Form.Item label="Comments" name="comments">
          <TextArea
            autoSize={{ minRows: 4, maxRows: 4 }}
            rows={4}
            placeholder="Write your comments here..."
          />
        </Form.Item>

        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            {prev && (
              <Button type="default" onClick={prev}>
                Previous
              </Button>
            )}
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </div>
        </Form.Item>
      </Form>
    </>
  );
};
