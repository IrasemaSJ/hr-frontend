import {
  Checkbox,
  DatePicker,
  Form,
  Input,
  Row,
  Button,
  DatePickerProps,
} from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';

const { RangePicker } = DatePicker;
const disableWeekEnds = (
  current: DatePickerProps['value'] | RangePickerProps['value'],
) => {
  return !current
    ? false
    : new Date(current.toString()).getDay() === 0 || // sundays
        new Date(current.toString()).getDay() === 6; // saturdays
};

export const InputDate = () => {
  const onChange = (
    value: DatePickerProps['value'] | RangePickerProps['value'],
    dateString: [string, string] | string,
  ) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  };

  const onOk = (
    value: DatePickerProps['value'] | RangePickerProps['value'],
  ) => {
    console.log('onOk: ', value);
  };
  return (
    <>
      <Form.Item label="Date" name="date">
        <RangePicker
          // showTime={{ format: 'HH:mm' }}
          format="YYYY-MM-DD"
          onChange={onChange}
          onOk={onOk}
          disabledDate={disableWeekEnds}
        />
      </Form.Item>
    </>
  );
};

// const DatePiker = () => {
//   <Input.Group className="contingency-form-row">
//     <Form.Item
//       label="Date"
//       name="date"
//       rules={[{ required: true, message: 'Please enter a date!' }]}
//     >
//       <DatePicker
//         style={{ width: '100%' }}
//         format="DD/MM/YYYY"
//         disabledDate={disableWeekEnds}
//       />
//     </Form.Item>

//     <Form.Item label="Half Day" name="halfday" valuePropName="checked">
//       <Checkbox />
//     </Form.Item>
//   </Input.Group>;
// };
