import {
  Checkbox,
  DatePicker,
  Form,
  Input,
  Row,
  Button,
  DatePickerProps,
  Tooltip,
} from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import * as dayjs from 'dayjs';
import { useState } from 'react';

const { RangePicker } = DatePicker;
const disableWeekEnds = (current: dayjs.Dayjs) => {
  return !current
    ? false
    : current.day() === 0 || // sundays
        current.day() === 6; // saturdays
};

interface DateState {
  date: dayjs.Dayjs;
  halfday: boolean;
}
const useRangePicker = () => {
  const [dateList, setDateList] = useState<DateState[]>([]);
  return {
    dateList,
  };
};

export const InputDate = () => {
  const [pickerDates, setPickerDates] = useState<dayjs.Dayjs[]>([]);
  const onOk = (value: RangePickerProps['value']) => {
    console.log('onOk: ', value);
  };
  const handleChange = (
    dates: RangePickerProps['value'],
    _dateStrings: [string, string],
  ) => {
    // verify dates is an dayjs array & is not empty
    if (dates && dayjs.isDayjs(dates[1]) && dayjs.isDayjs(dates[0])) {
      // how many days are between, including sun and satur
      const daysDiff = dates[1].diff(dates[0], 'days', true);

      console.log(dates);
      // list selected days without sun and satur
      const rangeDates: dayjs.Dayjs[] = [dates[0]];
      let nextDay: dayjs.Dayjs = dates[0];
      for (let i = 0; i < daysDiff; i++) {
        nextDay = nextDay.add(1, 'day');
        // if (nextDay.day() !== 6 && nextDay.day() !== 5) {
        rangeDates.push(nextDay);
        // }
      }
      console.log(daysDiff);
      // execute in state
      return setPickerDates([...rangeDates]);
    }
    setPickerDates([]);
  };
  return (
    <>
      <>
        <Form.Item label="Date" name="date" style={{ width: '100%' }}>
          <Input.Group compact>
            <RangePicker
              // format="YYYY-MM-DD"
              style={{ width: '90%' }}
              // onChange={handleChange}
              onOk={onOk}
              disabledDate={disableWeekEnds}
            />

            <Tooltip title="Add days">
              <Button style={{ width: '10%' }}>Add Days</Button>
            </Tooltip>
          </Input.Group>
        </Form.Item>
        {pickerDates?.map((date, index) => (
          <p key={index}>{date.toString()}</p>
        ))}
      </>
    </>
  );
};
