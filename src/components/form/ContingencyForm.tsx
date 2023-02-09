import { Button, Checkbox, DatePicker, Form, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import './ContingencyForm.css';
import * as dayjs from 'dayjs';
import { format } from '../../helpers';
import { SubmitValues } from '../../pages/employees/EmployeeInfo';

const { Title } = Typography;
interface Props {
  next: () => void;
  prev?: () => void;
  createContingency: (data: SubmitValues) => boolean;
}

export const ContingencyForm = ({ next, createContingency, prev }: Props) => {
  // notification
  const onSubmit = async ({ date, half_day, comments }: SubmitValues) => {
    const isOk = await createContingency({ date, half_day, comments });
    if (isOk) next();
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
      <Form
        name="basic"
        onFinish={onSubmit}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
      >
        <Title level={4}>Contingency</Title>

        <div className="contingency-form-row">
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: 'Please enter a date!' }]}
          >
            <DatePicker
              style={{ width: '100%' }}
              format={format.input}
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
