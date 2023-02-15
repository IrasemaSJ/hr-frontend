import { Button, Checkbox, Form, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import Title from 'antd/es/typography/Title';
import { ContingencyHttp } from '../../api/interfaces/contingency.interfaces';
import { useEffect } from 'react';
import { formatDateInput } from '../../helpers/formatDate';
import { InputDatePicker } from '../inputs';
import '../form/ContingencyForm.css';
interface Props {
  update: (values: any) => void;
  record: ContingencyHttp;
  width?: number;
  isModalOpen: boolean;
  closeModal: () => void;
  disabledDates: string[];
  contingenciesCount: number;
}

export const ModalEdit = ({
  update,
  record,
  width,
  isModalOpen,
  closeModal,
  disabledDates,
  contingenciesCount,
}: Props) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      date: formatDateInput(record.date),
      comments: record.comments,
      half_day: record.half_day,
    });
  }, [record, form]);
  return (
    <Modal width={width} open={isModalOpen} onCancel={closeModal} footer={[]}>
      <Form
        name="basic"
        onFinish={update}
        autoComplete="off"
        layout="vertical"
        form={form}
      >
        <Title level={4}>Edit Contingency</Title>
        <div className="contingency-form-row">
          <Form.Item
            label="Date"
            name="date"
            rules={[{ required: true, message: 'Please enter a date!' }]}
          >
            <InputDatePicker disabledDates={disabledDates} disableWeekends />
          </Form.Item>

          <Form.Item
            label="Half Day"
            name="half_day"
            valuePropName="checked"
            className="contingency-form-checkbox"
            rules={[
              {
                validator: (_, value) => {
                  return contingenciesCount < 3 ||
                    (contingenciesCount === 3 && !!value)
                    ? Promise.resolve()
                    : Promise.reject(new Error('Only half day available'));
                },
              },
            ]}
          >
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
          <div style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};
