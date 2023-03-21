import { Button, Checkbox, Form, Typography } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import './ContingencyForm.css';
import { CreateContingencyForm } from './interfaces';
import { InputDatePicker } from '../inputs/InputDatePicker';

const { Title } = Typography;
interface Props {
  next: () => void;
  prev?: () => void;
  createContingency: (data: CreateContingencyForm) => boolean;
  disabledDates: string[];
  contingenciesCount: number;
}

export const ContingencyForm = ({
  next,
  createContingency,
  prev,
  disabledDates,
  contingenciesCount,
}: Props) => {
  // notification
  const onSubmit = async ({ date, comments }: CreateContingencyForm) => {
    const isOk = await createContingency({ date, comments });
    if (isOk) next();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
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
        <Form.Item
          label="Date"
          name="date"
          rules={[{ required: true, message: 'Please enter a date!' }]}
        >
          <InputDatePicker disabledDates={disabledDates} disableWeekends />
        </Form.Item>

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
